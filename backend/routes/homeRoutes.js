const express = require('express');
const { addHome, getHomes, getHomeById, updateHome, deleteHome } = require('../controllers/homesController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload');
const router = express.Router();

// Upload home image (for agents or admins)
router.post('/upload', auth, role(['agent', 'admin']), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/uploads/homes/${req.file.filename}`,
  });
});

// Add a new home (agents or admins)
router.post('/', auth, role(['agent', 'admin']), addHome);

module.exports = router;