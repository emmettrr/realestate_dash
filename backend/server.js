require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const homesRoutes = require('./routes/homeRoutes');
const clientsRoutes = require('./routes/clientsRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from this origin (your frontend)
  credentials: true,                // Allow credentials (e.g., cookies, authentication)
}));

app.options('*', cors());

app.use('/api/auth', authRoutes);

app.use(cors());
app.use(express.json());

app.use('/api', homesRoutes);     // Route for homes and lots
app.use('/api/clients', clientsRoutes);  // Route for clients

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});