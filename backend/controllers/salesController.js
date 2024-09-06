const Sale = require('../models/Sale');

// Add a new sale (for admin or agent)
exports.addSale = async (req, res) => {
  const { home, client, salePrice } = req.body;

  try {
    const sale = new Sale({
      home,
      client,
      salePrice,
      agent: req.user.userId, // The agent handling the sale
    });

    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Error adding sale' });
  }
};

// Get all sales (for admin or agents to view their own sales)
exports.getSales = async (req, res) => {
  try {
    let sales;

    if (req.user.role === 'admin') {
      sales = await Sale.find().populate('home client agent', 'address name email salePrice');
    } else {
      sales = await Sale.find({ agent: req.user.userId }).populate('home client agent', 'address name email salePrice');
    }

    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales' });
  }
};

// Get a single sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('home client agent', 'address name email salePrice');
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sale' });
  }
};