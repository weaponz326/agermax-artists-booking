// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { createVismaInvoice } = require("../services/vismaInvoiceService");
const multer = require("multer");

const galleryUpload = multer({ dest: "uploads/booking/artist_gallery/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/booking"); // Adjust path as necessary
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });

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
  upload.fields([
    { name: "mainBanner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  bookingController.createBooking
);

// For updating a booking
router.put(
  "/bookings/:id",
  upload.fields([
    { name: "mainBanner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
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

// Route for getting total bookings by artist
router.get(
  "/bookings/artist/:artistId/total",
  bookingController.getTotalBookingsByArtist
);

// Route for getting all bookings that contain an artistID
router.get(
  "/bookings/artist/:artistId/all-with-artist",
  bookingController.getAllBookingsWithArtist
);

// Route for getting the total number of pending bookings
router.get(
  "/bookings/pending/total",
  bookingController.getTotalPendingBookings
);

// Route for getting total pending bookings by organizer
router.get(
  "/bookings/organizer/:organizerID/total-pending",
  bookingController.getTotalPendingBookingsByOrganizer
);

// Route for getting the three most recent bookings
router.get("/recent-bookings", bookingController.getRecentBookings);

// Route for getting recent bookings by organizer
router.get(
  "/bookings/organizer/:organizerID/recent",
  bookingController.getRecentBookingsByOrganizer
);

// Route for getting all approved bookings
router.get("/approved-bookings", bookingController.getAllApprovedBookings);

// Route for getting the next upcoming approved booking compared to the current date
router.get(
  "/next-upcoming-approved",
  bookingController.getNextUpcomingApprovedBooking
);

// Route for getting upcoming approved bookings by organizer
router.get(
  "/bookings/organizer/:organizerID/upcoming-approved",
  bookingController.getApprovedBookingsByOrganizer
);

// Route for getting top 10 booked artists
router.get("/top-artists", bookingController.getTop10BookedArtists);

// Route for getting organizers who have booked a specific artistID
router.get(
  "/bookings/artist/:artistId/organizers-by-artist",
  bookingController.getOrganizersByArtistID
);

// Route for getting venues who have booked a specific artistID
router.get(
  "/bookings/artist/:artistId/venues",
  bookingController.getVenuesByArtistID
);

module.exports = router;
