const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const bookingSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
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
  gallery: {
    type: [String],
  },
});

bookingSchema.plugin(AutoIncrement, { inc_field: "bookingID" });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
