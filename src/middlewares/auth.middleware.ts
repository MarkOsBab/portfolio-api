import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import config from "../utils/config.js";

export const authToken = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(400).json({error: "Not authenticated"});
        } else {
            const token: any = authHeader?.split(" ")[1];
        
            jwt.verify(token, config.secretKey as Secret, (error: any, credentials: any) => {
                if (error) {
                    throw error.message;
                } else {
                    delete credentials.user.password;
                    req.user = credentials.user;
                    next();
                }
            });
        } 
    } catch (error:any) {
        next(error);
    }
  };
};
