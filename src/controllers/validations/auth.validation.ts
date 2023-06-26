import { body, ValidationChain } from "express-validator";

export const createAuthValidation: ValidationChain[] = [
    body('username')
        .notEmpty()
        .withMessage('The username field is required'),
    body('password')
        .notEmpty()
        .withMessage('The password field is required')
];