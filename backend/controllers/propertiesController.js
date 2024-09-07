const Property = require('../models/Property'); // Assuming a Property model
const Agent = require('../models/Agent'); // Assuming an Agent model

// Controller to assign an agent to a property
const assignAgentToProperty = async (req, res) => {
  const { propertyId, agentId, propertyType } = req.body;

  try {
    let property;
    if (propertyType === 'home') {
      property = await Property.findById(propertyId); // Assuming Property includes both homes and lots
    } else if (propertyType === 'lot') {
      property = await Lot.findById(propertyId); // Assuming you have a separate Lot model
    }

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    property.assignedAgent = agentId; // Assuming you have a field for assigned agent
    await property.save();

    return res.status(200).json({ message: 'Agent assigned successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { assignAgentToProperty };
