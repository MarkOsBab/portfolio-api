import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import fs from "fs";

export const validationMiddleware = (validations: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await Promise.all(validations.map((validation) => validation.run(req)));
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                if(req.file) {
                    fs.unlinkSync(req.file.path);
                } else if(req.files) {
                    if(Array.isArray(req.files)) {
                        req.files.forEach((file: Express.Multer.File) => {
                            fs.unlinkSync(file.path);
                        });
                    }
                }
                res.status(400).json({error: errors.array()});
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    }
}