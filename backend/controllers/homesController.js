const homes = [
  { id: 1, name: 'Home 1', price: 500000, address: '123 Main St', agent: '' },
  { id: 2, name: 'Home 2', price: 750000, address: '456 Oak St', agent: '' },
  { id: 3, name: 'Home 3', price: 600000, address: '789 Pine St', agent: '' },
];

// Add Home controller function
const addHome = (req, res) => {
  const { name, price, address, mls, image } = req.body;

  // Generate a new home ID
  const newHome = {
    id: homes.length + 1,
    name,
    price,
    address,
    mls,
    image,
    agent: '', // Initial agent is not assigned
  };

  // Add the new home to the homes array
  homes.push(newHome);

  // Return the newly created home
  res.status(201).json({ message: 'Home added successfully', home: newHome });
};

// Update Home controller function
const updateHome = (req, res) => {
  const { homeId } = req.params;
  const { name, price, address, mls, image, agent } = req.body;

  // Find the home by ID
  const home = homes.find((home) => home.id === parseInt(homeId));
  if (!home) {
    return res.status(404).json({ message: 'Home not found' });
  }

  // Update the home details
  home.name = name || home.name;
  home.price = price || home.price;
  home.address = address || home.address;
  home.mls = mls || home.mls;
  home.image = image || home.image;
  home.agent = agent || home.agent;

  res.json({ message: 'Home updated successfully', home });
};

// Get All Homes
const getHomes = (req, res) => {
  res.json(homes);
};

module.exports = { addHome, updateHome, getHomes };