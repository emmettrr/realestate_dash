const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimiter');
const morgan = require('morgan');
const routes = require('./routes');

// Initialize dotenv and connect to the database
dotenv.config();
connectDB();

// Initialize express
const app = express();

// Set security headers
app.use(helmet());

// Apply rate limiting
app.use(limiter);

// Use Morgan to log requests in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));