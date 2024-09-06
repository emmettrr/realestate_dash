const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  interestedIn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'follow-up', 'closed'],
    default: 'new',
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the agent
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Client', ClientSchema);