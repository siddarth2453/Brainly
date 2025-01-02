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
const JWT_SECRET = "TOPSECRET";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const exsitingUser = yield schema_1.UserModel.findOne({
            email,
        });
        if (!exsitingUser) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield schema_1.UserModel.create({
                username,
                email,
                password: hashedPassword,
            });
            res.status(201).json({
                message: "user signed up succesfully!",
                username,
            });
        }
        else {
            res.status(403).json({
                message: "account already exists",
                username: exsitingUser.username,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield schema_1.UserModel.findOne({ email });
        if (existingUser) {
            const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
            if (isMatch) {
                const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET);
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
        res.status(500).json({
            message: " Something went wrong! | server error",
        });
    }
}));
app.post("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, type, title, tags } = req.body;
        yield schema_1.ContentModel.create({
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
    }
    catch (error) {
        res.status(400).json({
            message: "something went wrong",
        });
    }
}));
app.get("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
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
        console.log(error);
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
        const share = req.body.share;
        if (share) {
            yield schema_1.LinkModel.create({
                hash: (0, randomHash_1.default)(10),
                userId: req.userId
            });
            res.status(200).json({
                message: "Generated Sharable Link",
                userId: req.userId
            });
        }
        else {
            yield schema_1.LinkModel.deleteOne({
                userId: req.userId
            });
            res.status(200).json({
                message: "Deleted Sharable Link"
            });
        }
    }
    catch (error) {
        res.status(200).json({
            message: "Link already Exists"
        });
    }
}));
app.listen(3000, () => {
    console.log("server running succesfull");
    (0, db_1.connectDb)();
});
