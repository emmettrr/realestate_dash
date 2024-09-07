const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  address: { type: String, required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to agent
  status: {
    type: String,
    enum: ['for sale', 'under contract', 'sold'],  // Property status
    default: 'for sale',
  },
  image: { type: String },  // Property image path
});

module.exports = mongoose.model('Home', HomeSchema);