const Invoice = require("../models/Invoice");

exports.getAllInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate({
      path: "booking",
      populate: [
        {
          path: "organizerID",
          model: "User",
          select: "firstName lastName email contactPhone _id",
        },
        {
          path: "artistID",
          model: "User",
          select: "firstName lastName _id",
        },
      ],
    });

    const transformedInvoices = invoices.map((invoice) => {
      const booking = invoice.booking || {};
      const organizer = booking.organizerID || {};
      const artist = booking.artistID || {};
      const eventTitle = booking.eventTitle || "";

      const {
        _id: organizerId = "",
        firstName: organizerFirstName = "",
        lastName: organizerLastName = "",
        email: organizerEmail = "",
        contactPhone: organizerContactPhone = "",
      } = organizer;

      const {
        _id: artistId = "",
        firstName: artistFirstName = "",
        lastName: artistLastName = "",
      } = artist;

      return {
        _id: invoice._id,
        amount: invoice.amount,
        tax: invoice.tax,
        currency: invoice.currency,
        email: invoice.email,
        status: invoice.status,
        invoiceDate: invoice.invoiceDate,
        paymentDueDate: invoice.paymentDueDate,
        __v: invoice.__v,
        booking: booking._id || "N/A",
        bookingId2: booking.bookingID || "N/A",
        organizerId,
        organizerFirstName,
        organizerLastName,
        organizerEmail,
        organizerContactPhone,
        artistId,
        artistFirstName,
        artistLastName,
        eventTitle,
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
      populate: [
        {
          path: "organizerID",
          model: "User",
          select: "firstName lastName email contactPhone _id",
        },
        {
          path: "artistID",
          model: "User",
          select: "firstName lastName _id",
        },
      ],
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const booking = invoice.booking || {};
    const organizer = booking.organizerID || {};
    const artist = booking.artistID || {};
    const eventTitle = booking.eventTitle || "";

    const {
      _id: organizerId = "",
      firstName: organizerFirstName = "",
      lastName: organizerLastName = "",
      email: organizerEmail = "",
      contactPhone: organizerContactPhone = "",
    } = organizer;

    const {
      _id: artistId = "",
      firstName: artistFirstName = "",
      lastName: artistLastName = "",
    } = artist;

    const transformedInvoice = {
      _id: invoice._id,
      amount: invoice.amount,
      tax: invoice.tax,
      currency: invoice.currency,
      email: invoice.email,
      status: invoice.status,
      invoiceDate: invoice.invoiceDate,
      paymentDueDate: invoice.paymentDueDate,
      __v: invoice.__v,
      booking: booking._id || "N/A",
      bookingId2: booking.bookingID || "N/A",
      organizerId,
      organizerFirstName,
      organizerLastName,
      organizerEmail,
      organizerContactPhone,
      artistId,
      artistFirstName,
      artistLastName,
      eventTitle,
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

//Total Invoices
exports.getTotalUnpaidInvoices = async (req, res) => {
  try {
    const totalUnpaidInvoices = await Invoice.countDocuments({
      status: "unpaid",
    });
    res.status(200).json({ totalUnpaidInvoices });
  } catch (error) {
    console.error("Error retrieving total unpaid invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTotalUnpaidInvoicesByOrganizer = async (req, res) => {
  const { organizerID } = req.params;

  try {
    const totalUnpaidInvoices = await Invoice.countDocuments({
      organizerID: organizerID,
      status: "unpaid",
    });

    res.status(200).json({ totalUnpaidInvoices });
  } catch (error) {
    console.error(
      "Error retrieving total unpaid invoices by organizer:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};
