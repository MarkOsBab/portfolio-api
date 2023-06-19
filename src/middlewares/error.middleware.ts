import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.send({name: err.name, message: err.message});
    next();
}