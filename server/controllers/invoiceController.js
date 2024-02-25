const Invoice = require('../models/Invoice');

exports.getAllInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate({
        path: 'booking',
        populate: {
          path: 'organizerID',
          model: 'User',
          select: 'firstName lastName email -_id'
        }
      });

    // Transforming the response
    const transformedInvoices = invoices.map(invoice => {
      const { firstName, lastName, email } = invoice.booking.organizerID;
      return {
        ...invoice.toJSON(),
        organizerFirstName: firstName,
        organizerLastName: lastName,
        organizerEmail: email,
        booking: { ...invoice.booking.toJSON(), organizerID: undefined } // Exclude the original nested organizerID
      };
    });

    res.json(transformedInvoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate({
        path: 'booking',
        populate: {
          path: 'organizerID',
          model: 'User',
          select: 'firstName lastName email -_id'
        }
      });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Transforming the response
    const { firstName, lastName, email } = invoice.booking.organizerID;
    const transformedInvoice = {
      ...invoice.toJSON(),
      organizerFirstName: firstName,
      organizerLastName: lastName,
      organizerEmail: email,
      booking: { ...invoice.booking.toJSON(), organizerID: undefined } // Exclude the original nested organizerID
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
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
