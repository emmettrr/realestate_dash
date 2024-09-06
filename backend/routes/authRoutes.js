const express = require('express');
const { check } = require('express-validator');
const { register, login, getUserDetails } = require('../controllers/authController');
const auth = require('../middleware/auth');  // Middleware to protect routes
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (admin or agent)
// @access  Public (but will check roles for admin registration in the controller)
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
  ],
  register  // Controller function for handling registration
);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login  // Controller function for handling login
);

// @route   GET /api/auth/me
// @desc    Get current user details
// @access  Private (requires token)
router.get('/me', auth, getUserDetails);  // `auth` middleware ensures that this route is protected

module.exports = router;
