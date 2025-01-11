"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./utils/db");
const schema_1 = require("./models/schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userMiddleware_1 = require("./middlewares/userMiddleware");
const randomHash_1 = __importDefault(require("./utils/randomHash"));
const cors_1 = __importDefault(require("cors"));
const zodValidation_1 = require("./utils/zodValidation");
const zod_1 = require("zod");
const contentMiddleware_1 = __importDefault(require("./middlewares/contentMiddleware"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173", // Localhost frontend
        "https://brainlybybeast.vercel.app", // Production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials (cookies or JWT tokens)
}));
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate the request body using Zod
        const { username, email, password } = zodValidation_1.signupSchema.parse(req.body);
        const existingUsername = yield schema_1.UserModel.findOne({ username });
        if (existingUsername) {
            res.status(403).json({
                message: "Username already taken, try other username",
                username: existingUsername,
            });
        }
        else {
            const existingUser = yield schema_1.UserModel.findOne({ email });
            if (!existingUser) {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                yield schema_1.UserModel.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                res.status(201).json({
                    message: "User signed up successfully!",
                    username,
                });
            }
            else {
                res.status(403).json({
                    message: "Account already exists",
                    username: existingUser.username,
                });
            }
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Handle validation errors
            res.status(400).json({
                message: "Validation error",
                errors: error.errors, // Contains detailed validation errors
            });
        }
        else {
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield schema_1.UserModel.findOne({ email });
        if (existingUser) {
            const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isMatch) {
                if (!process.env.JWT_SECRET) {
                    throw new Error("JWT_SECRET is not defined");
                }
                const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET);
                res.status(200).json({
                    message: "user signed in",
                    token,
                    username: existingUser.username,
                });
            }
            else {
                res.status(401).json({
                    message: "invalid credential",
                });
            }
        }
        else {
            res.status(400).json({
                message: "Account Doesn't exist.",
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Handle validation errors
            res.status(400).json({
                message: "Validation error",
                errors: error.errors, // Contains detailed validation errors
            });
        }
        else {
            res.status(500).json({
                message: "Something went wrong",
            });
        }
    }
}));
app.post("/api/v1/content", userMiddleware_1.userMiddleware, contentMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title } = req.body;
        yield schema_1.ContentModel.create({
            link,
            type,
            title,
            userId: req.userId,
        });
        res.status(200).json({
            message: "Content Added",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
        });
        console.error(error);
    }
}));
app.get("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const contents = yield schema_1.ContentModel.find({
            userId,
        }).populate("userId", "username");
        if (contents) {
            res.status(200).json({
                contents,
            });
        }
        else {
            res.status(400).json({
                message: "No content created by the user",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error,
        });
    }
}));
app.delete("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contentId } = req.body;
        const deleteContent = yield schema_1.ContentModel.deleteMany({
            _id: contentId,
            userId: req.userId,
        });
        if (deleteContent.deletedCount > 0) {
            res.status(200).json({
                message: "Content Deleted!",
            });
        }
        else {
            res.status(400).json({
                message: "Np Content Found!",
            });
        }
    }
    catch (error) {
        res.status(400).json({
            message: "Something went wRONG",
        });
    }
}));
app.post("/api/v1/brain/share", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { share } = req.body;
        if (share) {
            const existingUser = yield schema_1.LinkModel.findOne({
                userId: req.userId,
            });
            if (existingUser) {
                res.status(409).json({
                    message: "Already Link Exists",
                    hash: existingUser.hash,
                });
            }
            else {
                const hash = (0, randomHash_1.default)(10);
                yield schema_1.LinkModel.create({
                    hash,
                    userId: req.userId,
                });
                res.status(200).json({
                    message: "success creating sharable link",
                    hash,
                });
            }
        }
        else {
            const deletedLink = yield schema_1.LinkModel.deleteOne({
                userId: req.userId,
            });
            if (deletedLink.deletedCount > 0) {
                res.status(200).json({
                    message: "Deleted",
                });
            }
            else {
                res.status(400).json({
                    message: "Wrong input",
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
        });
    }
}));
app.get("/api/v1/brain/:share", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.params;
    try {
        const LinkInfo = yield schema_1.LinkModel.findOne({
            hash: share,
        });
        if (LinkInfo) {
            const userContents = yield schema_1.ContentModel.find({
                userId: LinkInfo.userId,
            }).populate("userId", "username");
            res.status(200).json({
                message: "Contents of User",
                userContents,
            });
        }
        else {
            res.status(400).json({
                message: "invalid link",
            });
        }
    }
    catch (error) {
        res.send("error");
    }
}));
app.listen(3000, () => {
    console.log("server running succesfull");
    (0, db_1.connectDb)();
});
