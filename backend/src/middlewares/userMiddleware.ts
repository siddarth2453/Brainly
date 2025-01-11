import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const JWT_SECRET = "TOPSECRET";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];

    if (token) {
      const decodedId = jwt.verify(token as string, JWT_SECRET);

      //@ts-ignore
      req.userId = decodedId.id;
      next();
    } else {
      res.status(401).json({
        message: "Please SignIn first to add your Brain",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went Wrong",
    });
  }
};
