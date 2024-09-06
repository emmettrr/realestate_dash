const express = require('express');
const { getProspectiveHomes, addProspectiveHome, updateProspectiveHome, deleteProspectiveHome } = require('../controllers/prospectiveHomesController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Get all prospective homes (public)
router.get('/', getProspectiveHomes);

// Add a new prospective home (agents or admins)
router.post('/', auth, role(['agent', 'admin']), addProspectiveHome);

// Update a prospective home (agents or admins)
router.put('/:id', auth, role(['agent', 'admin']), updateProspectiveHome);

// Delete a prospective home (agents or admins)
router.delete('/:id', auth, role(['agent', 'admin']), deleteProspectiveHome);

module.exports = router;