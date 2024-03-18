const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookingSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    trim: true,
    set: (value) => {
      // Convert to sentence case before saving
      return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    },
  },
  artistID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  organizerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  dateTimeRequested: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  getInTime: {
    type: Date,
  },
  numberOfGuests: {
    type: Number,
  },
  ageRange: {
    type: String,
  },
  locationVenue: {
    type: String,
    trim: true,
    set: (value) => {
      // Convert to sentence case before saving
      return value.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    },
  },
  streetAddress: {
    type: String,
  },
  availableTechnology: {
    type: String,
  },
  genre: {
    type: [String],
  },
  otherComments: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "approved", "cancelled"],
  },
  invoiced: {
    type: Boolean,
    default: false,
  },
  mainBanner: {
    type: String,
  },
  gallery: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isNewBooking: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.plugin(AutoIncrement, { inc_field: "bookingID" });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
