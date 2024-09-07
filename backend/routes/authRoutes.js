const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const role = require('../middleware/role'); // Import role middleware to check user roles
const { register, login, changePassword } = require('../controllers/authController'); // Ensure changePassword is also imported
const router = express.Router();

// Register route (For user registration)
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.register
);

// Admin route to create an agent (Admin only access)
router.post(
  '/create-agent', 
  authMiddleware, 
  role(['admin']),  // Ensuring only admins can create agents
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.register  // Admin can create an agent using the same register method
);

// Login route
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),  // Validate email
    check('password', 'Password is required').exists(),  // Ensure password exists
  ],
  authController.login
);

// Change Password route (Authenticated users)
router.put(
  '/change-password', 
  authMiddleware, 
  [
    check('currentPassword', 'Current password is required').exists(),
    check('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.changePassword
);

router.get('/verify-token', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

module.exports = router;