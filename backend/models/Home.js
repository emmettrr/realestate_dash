const mongoose = require('mongoose');

// Define the Home schema
const HomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  agent: {
    type: String,
    default: '',
  },
});

// Create and export the Home model
module.exports = mongoose.model('Home', HomeSchema);