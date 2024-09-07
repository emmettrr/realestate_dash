const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const agentController = require('../controllers/agentController');
const router = express.Router();

// Route to get all agents (Admins only)
router.get('/', auth, role(['admin']), agentController.getAllAgents);

// Route to add a new agent (Admins only)
router.post(
  '/add',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  auth, role(['admin']), 
  agentController.addAgent
);

// Route to remove an agent (Admins only)
router.delete('/:agentId', auth, role(['admin']), agentController.removeAgent);

module.exports = router;