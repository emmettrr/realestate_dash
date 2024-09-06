const mongoose = require('mongoose');

const ProspectiveClientSchema = new mongoose.Schema({
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
    type: String,  // The property or home the client is interested in
    required: true,
  },
});

module.exports = mongoose.model('ProspectiveClient', ProspectiveClientSchema);