const express = require('express');
const { assignAgentToProperty } = require('../controllers/propertiesController');
const auth = require('../middleware/auth');
const role = require('../middleware/role'); // To check if the user is an admin
const router = express.Router();

// Endpoint to assign an agent to a property (admin-only)
router.post('/assign-agent', auth, role(['admin']), assignAgentToProperty);

module.exports = router;