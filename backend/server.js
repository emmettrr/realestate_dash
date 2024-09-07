require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const homesRoutes = require('./routes/homeRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to database
connectDB();

// Apply middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your frontend
  credentials: true                 // Allow credentials like cookies
}));

// Routes
app.use('/api/auth', authRoutes);           // Authentication routes
app.use('/api/homes', homesRoutes);         // Homes and lots routes (use /api/homes)
app.use('/api/clients', clientsRoutes);     // Clients routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});