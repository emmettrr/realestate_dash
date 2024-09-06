const mongoose = require('mongoose');

const ProspectiveHomeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  estimatedPrice: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ProspectiveHome', ProspectiveHomeSchema);