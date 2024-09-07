const User = require('../models/User');

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');  // Fetch only agents
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Add a new agent
exports.addAgent = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    user = new User({
      name,
      email,
      password,  // Ensure password is hashed (should use a middleware or controller function to hash)
      role: 'agent',
    });

    await user.save();
    res.status(201).json({ message: 'Agent created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Remove an agent
exports.removeAgent = async (req, res) => {
  const { agentId } = req.params;

  try {
    const agent = await User.findByIdAndDelete(agentId);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    res.json({ message: 'Agent removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};