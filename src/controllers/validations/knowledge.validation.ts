import { body, ValidationChain } from "express-validator";

export const createKnowledgeValidations: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('The name field is required')
        .isLength({max: 255})
        .withMessage('The name field max length is 255'),
    body('description')
        .notEmpty()
        .withMessage('The description field is required'),
    body('visible')
        .notEmpty()
        .withMessage('The visible field is required')
        .isBoolean()
        .withMessage('The visible field want to be a boolean of type 1 or 0'),
    body('category')
        .notEmpty()
        .withMessage('The category field is required')
        .isLength({max: 100})
        .withMessage('The category field max length is 100')
];