const Invoice = require('../models/Invoice');

exports.getAllInvoice = async (req, res) => {
  try {
    const Invoice = await Invoice.find();
    res.json(Invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const Invoice = await Invoice.findById(req.params.id);
    res.json(Invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createInvoice = async (req, res) => {
  const Invoice = new Invoice(req.body);
  try {
    const newInvoice = await Invoice.save();
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
