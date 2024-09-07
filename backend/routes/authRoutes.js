const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { login } = require('../controllers/authController'); // Import login from authController
const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.register
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),  // Validate email
    check('password', 'Password is required').exists(),  // Ensure password exists
  ],
  login
);

// Change Password route (example, if needed)
router.put('/change-password', authMiddleware, authController.changePassword);

module.exports = router;