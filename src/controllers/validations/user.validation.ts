import { body, ValidationChain } from "express-validator";

export const createUserValidation: ValidationChain[] = [
    body('firstname')
        .notEmpty()
        .withMessage('Firstname field is required')
        .isLength({min: 3, max: 20})
        .withMessage('Firstname field min length is 3 and max length is 20'),
    body('lastname')
        .notEmpty()
        .withMessage('Lastname field is required')
        .isLength({min: 3, max: 20})
        .withMessage('Lastname field min length is 3 and max length is 20'),
    body('username')
        .notEmpty()
        .withMessage('Username field is required')
        .isLength({min: 3})
        .withMessage('Username field min length is 3'),
    body('email')
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Email field is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password field is required')
        .isLength({min: 6})
        .withMessage('Password min length is 6'),
];