const express = require('express');
const authRoutes = require('./authRoutes');
const homeRoutes = require('./homeRoutes');
const clientRoutes = require('./clientsRoutes');
const salesRoutes = require('./salesRoutes');

const router = express.Router();

router.get('/stats', (req, res) => {
    res.json({
      totalHomes: 15,
      totalAgents: 5,
      totalClients: 30,
    });
  });

// Use individual route modules
router.use('/auth', authRoutes);
router.use('/homes', homeRoutes);
router.use('/clients', clientRoutes);
router.use('/sales', salesRoutes);

module.exports = router;