const express = require('express');
const { addClient, getClients, updateClientStatus, deleteClient } = require('../controllers/clientsController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Add a new client (for agents)
router.post('/', auth, role(['agent', 'admin']), addClient);

// Get all clients (for agents or admin)
router.get('/', auth, getClients);

// Update client status (contacted, follow-up, etc.)
router.put('/:id/status', auth, role(['agent', 'admin']), updateClientStatus);

// Delete a client (admin only)
router.delete('/:id', auth, role(['admin']), deleteClient);

module.exports = router;
