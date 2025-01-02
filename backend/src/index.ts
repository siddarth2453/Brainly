import express from "express";
import { connectDb } from "./utils/db";
import { UserModel, ContentModel } from "./models/schema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "./middlewares/userMiddleware";

const JWT_SECRET = "TOPSECRET";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exsitingUser = await UserModel.findOne({
      email,
    });

    if (!exsitingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "user signed up succesfully!",
        username,
      });
    } else {
      res.status(403).json({
        message: "account already exists",
        username: exsitingUser.username,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);

      if (isMatch) {
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

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
    res.status(500).json({
      message: " Something went wrong! | server error",
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { link, type, title, tags } = req.body;

    await ContentModel.create({
      link,
      type,
      title,
      tags,
      //@ts-ignore
      userId: req.userId,
    });

    res.status(200).json({
      message: "Content Added",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
    });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    //@ts-ignore
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
    console.log(error);
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    const deleteContent = await ContentModel.deleteMany({
      _id: contentId,
      //@ts-ignore
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

app.listen(3000, () => {
  console.log("server running succesfull");
  connectDb();
});