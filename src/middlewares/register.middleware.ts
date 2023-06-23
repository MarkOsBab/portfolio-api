import { NextFunction, Request, Response } from "express"
import passport from "passport"
import UserInterface from "../interfaces/user.interface.js";

export const registerMiddleware = (strategy: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(strategy, (error: any, user: UserInterface) => {
            if(error) {
                res.status(500).json({error: error.message});
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    };
}