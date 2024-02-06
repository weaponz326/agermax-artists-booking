// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { createVismaInvoice } = require('../services/vismaInvoice');

// Route to handle booking approval and invoice creation
router.post('/approveBooking/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Here you would update the booking status to approved in your database
    // For simplicity, this step is not shown

    // Create invoice in Visma
    const invoice = await createVismaInvoice(booking);
    
    // You might want to save invoice details back in your database here

    res.json({ message: 'Booking approved and invoice created', invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.post('/bookings', bookingController.createBooking);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);

module.exports = router;
