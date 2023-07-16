import { body } from 'express-validator'

export const locationValidator = [
    body('location.city')
        .isString()
        .isLength({ min: 1, max: 255 }).withMessage("The value must be between 1 and 255 characters long"),
    body('location.state')
        .isString()
        .isLength({ min: 1, max: 255 }).withMessage("The value must be between 1 and 255 characters long"),
    body('location.country')
        .isString()
        .isLength({ min: 1, max: 255 }).withMessage("The value must be between 1 and 255 characters long"),
    body('location.zip_code')
        .isString()
        .isNumeric()
        .isLength({ min: 5, max: 5 }).withMessage("The value must have exactly 5 digits"),
    body('location.address')
        .isString()
        .notEmpty().withMessage("The value can not be empty")
]