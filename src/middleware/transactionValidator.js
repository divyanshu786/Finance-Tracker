const { body } = require('express-validator');

const transactionValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('currency').notEmpty().withMessage('Currency is required'),
    body('dateTime').notEmpty().withMessage('Date is required'),
    body('category').notEmpty().withMessage('Category is required')
];

module.exports = {
    transactionValidator,
};