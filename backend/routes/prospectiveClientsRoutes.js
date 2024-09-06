const express = require('express');
const { getProspectiveClients, addProspectiveClient, updateProspectiveClient, deleteProspectiveClient } = require('../controllers/prospectiveClientsController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Get all prospective clients (public)
router.get('/', getProspectiveClients);

// Add a new prospective client (agents or admins)
router.post('/', auth, role(['agent', 'admin']), addProspectiveClient);

// Update a prospective client (agents or admins)
router.put('/:id', auth, role(['agent', 'admin']), updateProspectiveClient);

// Delete a prospective client (agents or admins)
router.delete('/:id', auth, role(['agent', 'admin']), deleteProspectiveClient);

module.exports = router;