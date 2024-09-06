const express = require('express');
const { addSale, getSales, getSaleById } = require('../controllers/salesController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

// Add a new sale (for agents or admin)
router.post('/', auth, role(['agent', 'admin']), addSale);

// Get all sales
router.get('/', auth, getSales);

// Get a sale by ID
router.get('/:id', auth, getSaleById);

module.exports = router;
