const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/authRoutes');
const artistRoutes = require('./routes/artistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', artistRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));