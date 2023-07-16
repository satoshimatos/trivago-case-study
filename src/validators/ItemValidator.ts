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

export const exampleValidator = [
    body('name').notEmpty().isString().isLength({ min: 10, max: 255 }).custom(value => {
        if (forbiddenNameKeywords.includes(value)) {
            throw new Error('Invalid value');
        }
        return true;
    }),
    body('rating').isInt({ min: 0, max: 5 }),
    body('category').isIn(acceptedCategories).withMessage('The value for field "category" is invalid'),
    body('image').isURL(),
    body('reputation').toInt().isInt({ min: 0, max: 1000 }).withMessage('Value must be an integer between 0 and 1000'),
    body('price').notEmpty().isInt(),
    body('availability').notEmpty().isInt()
];