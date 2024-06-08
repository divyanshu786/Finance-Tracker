const { body } = require('express-validator');

const validateRegistration = [
  body('firstname').isLength({min:3}).withMessage('First must be of 3 characters long.')
  .matches(/^[A-Za-z\s]+$/).withMessage('Name must be alphabetic.'),
  body('lastname').isLength({min:3}).withMessage('Last must be of 3 characters long.'),
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

const validateLogin = [
  body('email').isEmail().notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

module.exports = {
  validateRegistration,
  validateLogin,
};
