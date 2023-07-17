import { body } from 'express-validator'

const acceptedCategories = [
    'hotel',
    'alternative',
    'hostel',
    'lodge',
    'resort',
    'guesthouse'
]

const forbiddenNameKeywords = [
    'Free',
    'Offer',
    'Book',
    'Website'
]

export const itemValidator = [
    body('name')
        .isString()
        .isLength({ min: 10, max: 255 }).withMessage("The value must be between 10 and 255 characters long")
        .custom(value => {
            forbiddenNameKeywords.filter(word => {
                if (value.toString().toLowerCase().includes(word.toLowerCase())) {
                    throw new Error("The following words: 'Free', 'Offer', 'Book', and 'Website' are not accepted")
                }
            }) 
            return true
        }),
    body('rating')
        .isInt({ min: 0, max: 5 }).withMessage("The value must be an integer between 0 and 5"),
    body('category')
        .isIn(acceptedCategories).withMessage("The value must be one of the following: 'hotel', 'alternative', 'hostel', 'lodge', 'resort', 'guesthouse'"),
    body('image')
        .isURL().withMessage("Value must be a valid URL"),
    body('reputation')
        .isInt({ min: 0, max: 1000 }).withMessage('Value must be an integer between 0 and 1000'),
    body('price')
        .isInt().withMessage("Value must be an integer"),
    body('availability')
        .isInt({ min: 0 }).withMessage("Value must be an integer greater than zero"),
    body('location')
        .isObject().withMessage("Value must be a valid object")
]