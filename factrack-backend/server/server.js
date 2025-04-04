require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
