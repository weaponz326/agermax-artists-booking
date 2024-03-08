// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { createVismaInvoice } = require("../services/vismaInvoiceService");
const multer = require("multer");

const galleryUpload = multer({ dest: "uploads/booking/artist_gallery/" });

// Route to handle booking approval and invoice creation
router.post("/approveBooking/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Here you would update the booking status to approved in your database
    // For simplicity, this step is not shown

    // Create invoice in Visma
    const invoice = await createVismaInvoice(booking);

    // You might want to save invoice details back in your database here

    res.json({ message: "Booking approved and invoice created", invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/bookings", bookingController.getAllBookings);
router.get("/bookings/:id", bookingController.getBookingById);
router.post(
  "/bookings",
  galleryUpload.array("gallery", 10),
  bookingController.createBooking
);
router.put(
  "/bookings/:id",
  galleryUpload.array("gallery", 10),
  bookingController.updateBooking
);
router.delete("/bookings/:id", bookingController.deleteBooking);

//************Matrix Routes*******************//
// Route for getting all bookings created by an organizer
router.get("/total-bookings", bookingController.getTotalBookings);

// Route for getting all bookings created by an organizer
router.get(
  "/bookings/organizer/:organizerId",
  bookingController.getBookingsByOrganizer
);

// Route for getting the total number of bookings created by an organizer
router.get(
  "/bookings/organizer/:organizerId/total",
  bookingController.getTotalBookingsByOrganizer
);

// Route for getting the total number of pending bookings
router.get(
  "/bookings/pending/total",
  bookingController.getTotalPendingBookings
);
// Route for getting the three most recent bookings
router.get("/recent-bookings", bookingController.getRecentBookings);

module.exports = router;
