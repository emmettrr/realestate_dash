const express = require('express');
const { getClients } = require('../controllers/clientsController');
const router = express.Router();

router.get('/', getClients);   // Route to get all clients

module.exports = router;
