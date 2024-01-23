const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const artistRoutes = require('./routes/artistRoutes');
const organizerRoutes = require('./routes/eventOrganizerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors'); // Import CORS

dotenv.config();
connectDB();

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
