const ProspectiveClient = require('../models/ProspectiveClient');  // Assuming you have a ProspectiveClient model

// Get all prospective clients
exports.getProspectiveClients = async (req, res) => {
  try {
    const clients = await ProspectiveClient.find();  // Fetch all clients from the database
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new prospective client
exports.addProspectiveClient = async (req, res) => {
  const { name, email, phone, interestedIn } = req.body;

  try {
    const newClient = new ProspectiveClient({
      name,
      email,
      phone,
      interestedIn,  // Property client is interested in
    });

    const client = await newClient.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a prospective client
exports.updateProspectiveClient = async (req, res) => {
  const { name, email, phone, interestedIn } = req.body;

  try {
    const client = await ProspectiveClient.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name || client.name;
    client.email = email || client.email;
    client.phone = phone || client.phone;
    client.interestedIn = interestedIn || client.interestedIn;

    await client.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a prospective client
exports.deleteProspectiveClient = async (req, res) => {
  try {
    const client = await ProspectiveClient.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.remove();
    res.json({ message: 'Client deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};