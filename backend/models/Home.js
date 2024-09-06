const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'sold'],
    default: 'available',
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the agent (user)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Home', HomeSchema);