const Home = require('../models/Home');

// Add a new home
exports.addHome = async (req, res) => {
  try {
    const { name, price, address, agent } = req.body;
    const newHome = new Home({ name, price, address, agent });
    await newHome.save();
    res.status(201).json(newHome);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all homes
exports.getHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update a home
exports.updateHome = async (req, res) => {
  try {
    const { homeId } = req.params;
    const { name, price, address, agent } = req.body;
    const updatedHome = await Home.findByIdAndUpdate(
      homeId,
      { name, price, address, agent },
      { new: true }
    );
    if (!updatedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }
    res.json({ message: 'Home updated successfully', home: updatedHome });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete a home
exports.deleteHome = async (req, res) => {
  try {
    const { homeId } = req.params;
    const deletedHome = await Home.findByIdAndDelete(homeId);
    if (!deletedHome) {
      return res.status(404).json({ message: 'Home not found' });
    }
    res.json({ message: 'Home deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all homes (for agents, only the homes assigned to them)
exports.getHomes = async (req, res) => {
  try {
    const query = req.user.role === 'agent' ? { agent: req.user._id } : {};  // Filter for agents
    const homes = await Home.find(query).populate('agent', 'name');
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update the status of a home (admin/agent can change status)
exports.updateHomeStatus = async (req, res) => {
  try {
    const { homeId } = req.params;
    const { status } = req.body;
    const home = await Home.findByIdAndUpdate(homeId, { status }, { new: true });

    if (!home) return res.status(404).json({ message: 'Home not found' });

    res.json({ message: 'Home status updated successfully', home });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};