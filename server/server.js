const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
dotenv.config();
connectDB();
const app = express();
const cors = require('cors');

// Passport Configuration
require('./configs/passport-configs'); // Make sure this comes before routes


const userRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const artistRoutes = require('./routes/artistRoutes');
const organizerRoutes = require('./routes/eventOrganizerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');




// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000' // Set the allowed origin
}));

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', artistRoutes);
app.use('/api', organizerRoutes);
app.use('/api', bookingRoutes);
app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
