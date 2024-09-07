const express = require('express');
const { addHome, getHomes, updateHome, deleteHome } = require('../controllers/homesController'); // Ensure functions are properly imported
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/homes'); // Ensure this folder exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filenames
  }
});

const upload = multer({ storage: storage });

// Route to upload home image (for agents or admins)
router.post('/upload', auth, role(['agent', 'admin']), upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Image uploaded successfully',
    filePath: `/uploads/homes/${req.file.filename}`, // File path to store in database
  });
});

// Route to add a new home (agents or admins)
router.post('/', auth, role(['agent', 'admin']), addHome);

// Route to get all homes (public)
router.get('/', getHomes);

// Route to update home (agents or admins)
router.put('/:homeId/update', auth, role(['agent', 'admin']), updateHome);

// Route to delete home (admins only)
router.delete('/:homeId', auth, role(['admin']), deleteHome);

module.exports = router;