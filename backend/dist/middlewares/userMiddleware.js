"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "TOPSECRET";
const userMiddleware = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (token) {
            const decodedId = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            //@ts-ignore
            req.userId = decodedId.id;
            next();
        }
        else {
            res.status(401).json({
                message: "You are Unauthorised / No header provided",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Something went Wrong",
        });
    }
};
exports.userMiddleware = userMiddleware;
