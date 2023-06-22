import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationMiddleware = (validations: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.all(validations.map((validation) => validation.run(req)));
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                res.status(400).send({error: errors.array()});
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}