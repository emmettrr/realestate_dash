const ProspectiveHome = require('../models/ProspectiveHome');  // Assuming you have a ProspectiveHome model

// Get all prospective homes
exports.getProspectiveHomes = async (req, res) => {
  try {
    const prospectiveHomes = await ProspectiveHome.find();  // Fetch all prospective homes from the database
    res.json(prospectiveHomes);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new prospective home
exports.addProspectiveHome = async (req, res) => {
  const { name, estimatedPrice, location } = req.body;

  try {
    const newHome = new ProspectiveHome({
      name,
      estimatedPrice,
      location,
    });

    const home = await newHome.save();
    res.json(home);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a prospective home
exports.updateProspectiveHome = async (req, res) => {
  const { name, estimatedPrice, location } = req.body;

  try {
    const home = await ProspectiveHome.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: 'Prospective home not found' });
    }

    home.name = name || home.name;
    home.estimatedPrice = estimatedPrice || home.estimatedPrice;
    home.location = location || home.location;

    await home.save();
    res.json(home);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a prospective home
exports.deleteProspectiveHome = async (req, res) => {
  try {
    const home = await ProspectiveHome.findById(req.params.id);
    if (!home) {
      return res.status(404).json({ message: 'Prospective home not found' });
    }

    await home.remove();
    res.json({ message: 'Prospective home deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};