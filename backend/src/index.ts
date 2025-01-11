import express from "express";
import { connectDb } from "./utils/db";
import { UserModel, ContentModel, LinkModel } from "./models/schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middlewares/userMiddleware";
import randomHash from "./utils/randomHash";
import cors from "cors";
import { signupSchema, signinSchema } from "./utils/zodValidation";
import { z } from "zod";
import contentMiddleware from "./middlewares/contentMiddleware";

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",  // Localhost frontend
      "https://brainlybybeast.vercel.app",  // Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,  // Allow credentials (cookies or JWT tokens)
  })
);

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    // Validate the request body using Zod
    const { username, email, password } = signupSchema.parse(req.body);

    const existingUsername = await UserModel.findOne({ username });

    if (existingUsername) {
      res.status(403).json({
        message: "Username already taken, try other username",
        username: existingUsername,
      });
    } else {
      const existingUser = await UserModel.findOne({ email });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
          username,
          email,
          password: hashedPassword,
        });

        res.status(201).json({
          message: "User signed up successfully!",
          username,
        });
      } else {
        res.status(403).json({
          message: "Account already exists",
          username: existingUser.username,
        });
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({
        message: "Validation error",
        errors: error.errors, // Contains detailed validation errors
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {
        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign(
          { id: existingUser._id },
          process.env.JWT_SECRET
        );

        res.status(200).json({
          message: "user signed in",
          token,
          username: existingUser.username,
        });
      } else {
        res.status(401).json({
          message: "invalid credential",
        });
      }
    } else {
      res.status(400).json({
        message: "Account Doesn't exist.",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      res.status(400).json({
        message: "Validation error",
        errors: error.errors, // Contains detailed validation errors
      });
    } else {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
});

app.post("/api/v1/content", userMiddleware,contentMiddleware, async (req, res) => {
  try {
    const { link, type, title } = req.body;

    await ContentModel.create({
      link,
      type,
      title,
      userId: req.userId,
    });

    res.status(200).json({
      message: "Content Added",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
    console.error(error)
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {

    const userId = req.userId;

    const contents = await ContentModel.find({
      userId,
    }).populate("userId", "username");

    if (contents) {
      res.status(200).json({
        contents,
      });
    } else {
      res.status(400).json({
        message: "No content created by the user",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    const deleteContent = await ContentModel.deleteMany({
      _id: contentId,
      userId: req.userId,
    });

    if (deleteContent.deletedCount > 0) {
      res.status(200).json({
        message: "Content Deleted!",
      });
    } else {
      res.status(400).json({
        message: "Np Content Found!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something went wRONG",
    });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  try {
    const { share } = req.body;

    if (share) {
      const existingUser = await LinkModel.findOne({
        userId: req.userId,
      });

      if (existingUser) {
        res.status(409).json({
          message: "Already Link Exists",
          hash: existingUser.hash,
        });
      } else {
        const hash = randomHash(10);

        await LinkModel.create({
          hash,
          userId: req.userId,
        });

        res.status(200).json({
          message: "success creating sharable link",
          hash,
        });
      }
    } else {
      const deletedLink = await LinkModel.deleteOne({
        userId: req.userId,
      });

      if (deletedLink.deletedCount > 0) {
        res.status(200).json({
          message: "Deleted",
        });
      } else {
        res.status(400).json({
          message: "Wrong input",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
});

app.get("/api/v1/brain/:share", async (req, res) => {
  const { share } = req.params;
  try {
    const LinkInfo = await LinkModel.findOne({
      hash: share,
    });

    if (LinkInfo) {
      const userContents = await ContentModel.find({
        userId: LinkInfo.userId,
      }).populate("userId", "username");

      res.status(200).json({
        message: "Contents of User",
        userContents,
      });
    } else {
      res.status(400).json({
        message: "invalid link",
      });
    }
  } catch (error) {
    res.send("error");
  }
});

app.listen(3000, () => {
  console.log("server running succesfull");
  connectDb();
});