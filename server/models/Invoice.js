const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  paymentDueDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
