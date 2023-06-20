import { body, ValidationChain } from "express-validator";

export const createProjectValidations: ValidationChain[] = [
    body('name')
        .notEmpty()
        .withMessage('Name field is required')
        .isLength({max: 255})
        .withMessage('Name field length max is 255'),
    body('description').notEmpty().withMessage('Description field is required'),
    body("links")
        .notEmpty()
        .withMessage("Links field is required")
        .custom((value) => {
        try {
            const linksArray = JSON.parse(value);
            return Array.isArray(linksArray);
        } catch (error) {
            return false;
        }
        })
        .withMessage("Links format is not valid"),
    body('visible')
        .notEmpty()
        .withMessage('The visible field is required')
        .isBoolean()
        .withMessage('The visible field want to be a boolean of type 1 or 0'),
];