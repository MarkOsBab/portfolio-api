import { body, ValidationChain } from "express-validator";

export const createContactValidation: ValidationChain[] = [
    body('firstname')
        .notEmpty()
        .withMessage('Firstname field is required')
        .isLength({min: 3, max: 20})
        .withMessage('Firstname field min length is 3 and max length is 20'),
    body('lastname')
        .optional()
        .isLength({min: 3, max: 20})
        .withMessage('Lastname field min length is 3 and max length is 20'),
    body('email')
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Email field is not valid'),
    body('message')
        .notEmpty()
        .withMessage('The message field is required')
        .isString()
        .withMessage('The message field are not valid')
];