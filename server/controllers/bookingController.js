// controllers/bookingController.js
const Booking = require("../models/Booking");
const dayjs = require("dayjs");

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//***************Matrix Controllers***************//
//Total Number of Bookings
exports.getTotalBookings = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error retrieving total bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get All Bookings by a specific Organizer
exports.getBookingsByOrganizer = async (req, res) => {
  const { organizerId } = req.params;

  try {
    const bookings = await Booking.find({ organizerID: organizerId });

    if (!bookings) {
      return res.status(404).json({ message: "Bookings not found" });
    }

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Total Number of Bookings by a specific Organizer
exports.getTotalBookingsByOrganizer = async (req, res) => {
  const { organizerId } = req.params;

  try {
    const totalBookings = await Booking.countDocuments({
      organizerID: organizerId,
    });

    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error retrieving total bookings by organizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Total Number of Bookings by a specific Artist
exports.getTotalBookingsByArtist = async (req, res) => {
  const { artistId } = req.query;

  try {
    const totalBookings = await Booking.countDocuments({ artistID: artistId });

    res.status(200).json({ totalBookings });
  } catch (error) {
    console.error("Error retrieving total bookings by artist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Total Pending Bookings
exports.getTotalPendingBookings = async (req, res) => {
  try {
    const totalPendingBookings = await Booking.countDocuments({
      status: "pending",
    });
    res.status(200).json({ totalPendingBookings });
  } catch (error) {
    console.error("Error retrieving total pending bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTotalPendingBookingsByOrganizer = async (req, res) => {
  const { organizerID } = req.params;

  try {
    const totalPendingBookings = await Booking.countDocuments({
      organizerID: organizerID,
      status: "pending",
    });

    res.status(200).json({ totalPendingBookings });
  } catch (error) {
    console.error(
      "Error retrieving total pending bookings by organizer:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

//Recent Bookings
exports.getRecentBookings = async (req, res) => {
  try {
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(3);
    // .populate("organizerID", "fullName"); // Populate organizerID field to get organizer's fullname

    if (!recentBookings || recentBookings.length === 0) {
      return res.status(404).json({ message: "No recent bookings found" });
    }

    res.status(200).json({ recentBookings });
  } catch (error) {
    console.error("Error retrieving recent bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecentBookingsByOrganizer = async (req, res) => {
  const { organizerID } = req.params;

  try {
    const recentBookings = await Booking.find({ organizerID: organizerID })
      .sort({ createdAt: -1 })
      .limit(3);

    res.status(200).json({ recentBookings });
  } catch (error) {
    console.error("Error retrieving recent bookings by organizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllApprovedBookings = async (req, res) => {
  try {
    // Find all bookings with status 'approved'
    const approvedBookings = await Booking.find({ status: "approved" });

    res.status(200).json({ approvedBookings });
  } catch (error) {
    console.error("Error retrieving all approved bookings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getApprovedBookingsByOrganizer = async (req, res) => {
  const { organizerID } = req.params;

  try {
    // Get the current date
    const currentDate = dayjs();

    // Find bookings by the organizer with status 'approved' and date requested after the current date
    const approvedBookings = await Booking.find({
      organizerID: organizerID,
      status: "approved",
      dateTimeRequested: { $lte: currentDate.toDate() },
    });

    res.status(200).json({ approvedBookings });
  } catch (error) {
    console.error("Error retrieving approved bookings by organizer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
