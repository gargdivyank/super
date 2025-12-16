const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: './.env' });

// Import database configuration
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const leadRoutes = require('./routes/leads');
const landingPageRoutes = require('./routes/landingPages');
const accessRequestRoutes = require('./routes/accessRequests');
const dashboardRoutes = require('./routes/dashboard');
const superAdminRoutes = require('./routes/superAdmin');
const subAdminRoutes = require('./routes/subAdmin');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/landing-pages', landingPageRoutes);
app.use('/api/access-requests', accessRequestRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/super-admin', superAdminRoutes);
app.use('/api/sub-admin', subAdminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//do not use app.listen in vercel, use the following code:
module.exports = app;