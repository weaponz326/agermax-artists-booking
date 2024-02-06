const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const passport = require('passport'); // Make sure to require 'passport' here
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000' // Adjust the allowed origin as needed
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey', // Use an environment variable or replace 'yourSecretKey'
  resave: false,
  saveUninitialized: true,
  cookie: { secure: !!(process.env.NODE_ENV === 'production') } // Ensure cookies are secure in production
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session()); // Tells Passport to use express-session

// Importing Passport configuration
require('./configs/passport-configs'); // Adjust the path as needed

// Body parsing middleware setup
app.use(express.json());

// Routes
const userRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const artistRoutes = require('./routes/artistRoutes');
const organizerRoutes = require('./routes/eventOrganizerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', artistRoutes);
app.use('/api', organizerRoutes);
app.use('/api', bookingRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
