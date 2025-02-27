require('dotenv').config();
const express = require('express');
const connectDB = require('./app/config/db');
const cors = require('cors');
const customerRoutes = require("./app/routes/customerRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./app/routes/authRoutes'));
app.use('/api/', customerRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
