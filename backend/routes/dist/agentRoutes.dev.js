"use strict";

var express = require('express');

var _require = require('express-validator'),
    check = _require.check;

var auth = require('../middleware/auth');

var role = require('../middleware/role');

var agentController = require('../controllers/agentController');

var router = express.Router(); // Route to get all agents (Admins only)

router.get('/', auth, role(['admin']), agentController.getAllAgents); // Route to add a new agent (Admins only)

router.post('/add', [check('name', 'Name is required').not().isEmpty(), check('email', 'Please include a valid email').isEmail(), check('password', 'Password must be at least 6 characters').isLength({
  min: 6
})], auth, role(['admin']), agentController.addAgent); // Route to remove an agent (Admins only)

router["delete"]('/:agentId', auth, role(['admin']), agentController.removeAgent);
module.exports = router;