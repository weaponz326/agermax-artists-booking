// controllers/organizerController.js
const Organizer = require('../models/EventOrganizer');

exports.getAllOrganizers = async (req, res) => {
  try {
    const organizers = await Organizer.find();
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrganizer = async (req, res) => {
  const organizer = new Organizer(req.body);
  try {
    const newOrganizer = await organizer.save();
    res.status(201).json(newOrganizer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrganizer = async (req, res) => {
  try {
    const updatedOrganizer = await Organizer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOrganizer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrganizer = async (req, res) => {
  try {
    await Organizer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Organizer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
