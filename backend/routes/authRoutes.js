const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController'); // Import the controller functions

const router = express.Router();

// Register a new user
// Adds validation middleware to check incoming request fields
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('role', 'Role is required (admin or agent)').not().isEmpty()
  ],
  register // This is the controller function for registering a user
);

// Login a user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login // This is the controller function for logging in a user
);

module.exports = router;