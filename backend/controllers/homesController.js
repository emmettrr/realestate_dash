const Home = require('../models/Home');

// Add a new home (for admin or agent)
exports.addHome = async (req, res) => {
  const { address, price } = req.body;

  try {
    const home = new Home({
      address,
      price,
      agent: req.user.userId, // The agent who adds the home
    });

    await home.save();
    res.status(201).json(home);
  } catch (err) {
    res.status(500).json({ message: 'Error adding home' });
  }
};

// Get all homes (admin and agents can see all homes)
exports.getHomes = async (req, res) => {
  try {
    const homes = await Home.find().populate('agent', 'name email'); // Populate agent details
    res.status(200).json(homes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching homes' });
  }
};

// Get a single home by ID
exports.getHomeById = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id).populate('agent', 'name email');
    if (!home) return res.status(404).json({ message: 'Home not found' });
    res.json(home);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching home' });
  }
};

// Update a home's details (admin and the assigned agent can update)
exports.updateHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);

    if (!home) return res.status(404).json({ message: 'Home not found' });

    // Check if the user is admin or the assigned agent
    if (home.agent.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedHome = await Home.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedHome);
  } catch (err) {
    res.status(500).json({ message: 'Error updating home' });
  }
};

// Delete a home (admin only)
exports.deleteHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);

    if (!home) return res.status(404).json({ message: 'Home not found' });

    // Only admins can delete a home
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    await home.remove();
    res.json({ message: 'Home removed' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting home' });
  }
};