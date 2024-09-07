const express = require('express');
const { addHome, getHomes, getHomeById, updateHome, deleteHome } = require('../controllers/homesController'); // Ensure functions are imported
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const upload = require('../middleware/upload');
const router = express.Router();

// Properly defined routes
router.post('/upload', auth, role(['agent', 'admin']), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/uploads/homes/${req.file.filename}`,
  });
});

// Make sure the addHome function is properly imported and used
router.post('/', auth, role(['agent', 'admin']), addHome);

// Other routes...
router.put('/homes/:homeId/update', auth, role(['agent', 'admin']), updateHome);

module.exports = router;