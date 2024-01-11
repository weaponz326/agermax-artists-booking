// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingID: { 
    type: String, 
    required: true, 
    unique: true 
  },
  artistID: { 
    type: String, 
    required: true 
  },
  adminID: { 
    type: String, 
    required: true 
  },
  dateTimeRequested: { 
    type: Date, 
    default: Date.now 
  },
  startTime: { 
    type: Date 
  },
  endTime: { 
    type: Date 
  },
  getInTime: { 
    type: Date 
  },
  numberOfGuests: { 
    type: Number 
  },
  ageRange: { 
    type: String 
  },
  locationVenue: { 
    type: String 
  },
  availableTechnology: { 
    type: String 
  },
  otherComments: { 
    type: String 
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
