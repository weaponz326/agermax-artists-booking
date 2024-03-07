const Invoice = require("../models/Invoice");

exports.getAllInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate({
      path: "booking",
      populate: {
        path: "organizerID",
        model: "User",
        select: "firstName lastName email contactPhone _id",
      },
    });

    const transformedInvoices = invoices.map((invoice) => {
      // Check if booking exists
      const booking = invoice.booking || {};

      // Safely attempt to access organizerID properties
      const organizer = booking.organizerID || {};
      const {
        _id: organizerId = '',
        firstName = '',
        lastName = '',
        email = '',
        contactPhone = '',
      } = organizer;

      return {
        _id: invoice._id,
        amount: invoice.amount,
        tax: invoice.tax,
        email: invoice.email,
        status: invoice.status,
        invoiceDate: invoice.invoiceDate,
        paymentDueDate: invoice.paymentDueDate,
        __v: invoice.__v,
        organizerId,
        organizerFirstName: firstName,
        organizerLastName: lastName,
        organizerEmail: email,
        organizerContactPhone: contactPhone,
        booking: booking._id || 'N/A', // Fallback to 'N/A' if booking doesn't exist
        bookingId2: booking.bookingID || 'N/A',
      };
    });

    res.json(transformedInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate({
      path: "booking",
      populate: {
        path: "organizerID",
        model: "User",
        select: "firstName lastName email contactPhone _id",
      },
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // Check if booking exists
    const booking = invoice.booking || {};

    // Safely attempt to access organizerID properties
    const organizer = booking.organizerID || {};
    const {
      _id: organizerId = '',
      firstName = '',
      lastName = '',
      email = '',
      contactPhone = '',
    } = organizer;

    const transformedInvoice = {
      _id: invoice._id,
      amount: invoice.amount,
      tax: invoice.tax,
      email: invoice.email,
      status: invoice.status,
      invoiceDate: invoice.invoiceDate,
      paymentDueDate: invoice.paymentDueDate,
      __v: invoice.__v,
      organizerId,
      organizerFirstName: firstName,
      organizerLastName: lastName,
      organizerEmail: email,
      organizerContactPhone: contactPhone,
      booking: booking._id || 'N/A', // Fallback to 'N/A' if booking doesn't exist
      bookingId2: booking.bookingID || 'N/A',
    };

    res.json(transformedInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createInvoice = async (req, res) => {
  const invoice = new Invoice(req.body);
  try {
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
