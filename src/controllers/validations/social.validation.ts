import { body, ValidationChain } from "express-validator";

export const createSocialValidations: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Name field is required')
        .isLength({max: 255})
        .withMessage('Name field max length is 255'),
    body('url')
        .notEmpty()
        .withMessage('URL field is required')
        .isURL({require_protocol: true})
        .withMessage('URL field is not an url valid'),
    body('icon')
        .notEmpty()
        .withMessage('Icon field is required'),
];