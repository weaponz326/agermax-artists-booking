const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookingSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
  },
  artistID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Artist",
  },
  organizerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "EventOrganizer",
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
  genre: { 
    type: [String] 
  },
  numberOfGuests: {
    type: Number,
  },
  ageRange: {
    type: String,
  },
  locationVenue: {
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
  gallery: {
    type: [String],
  },
});

bookingSchema.plugin(AutoIncrement, { inc_field: "bookingID" });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;