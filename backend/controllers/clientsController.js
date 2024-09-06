const Client = require('../models/Client');

// Add a new client (for agents)
exports.addClient = async (req, res) => {
  const { name, email, phone, interestedIn } = req.body;

  try {
    const client = new Client({
      name,
      email,
      phone,
      interestedIn, // The property the client is interested in
      agent: req.user.userId, // The agent adding the client
    });

    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error adding client' });
  }
};

// Get all clients for an agent or admin
exports.getClients = async (req, res) => {
  try {
    let clients;

    if (req.user.role === 'admin') {
      clients = await Client.find().populate('interestedIn agent', 'address name email');
    } else {
      clients = await Client.find({ agent: req.user.userId }).populate('interestedIn agent', 'address name email');
    }

    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients' });
  }
};

// Update a client's status (for agents or admin)
exports.updateClientStatus = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ message: 'Client not found' });

    // Only the assigned agent or admin can update
    if (client.agent.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    client.status = req.body.status; // Update status (contacted, follow-up, etc.)
    await client.save();

    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error updating client' });
  }
};

// Delete a client (admin only)
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) return res.status(404).json({ message: 'Client not found' });

    // Only admin can delete a client
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    await client.remove();
    res.json({ message: 'Client removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting client' });
  }
};