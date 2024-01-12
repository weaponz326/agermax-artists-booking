// controllers/artistController.js
const Artist = require('../models/Artist');

exports.getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArtist = async (req, res) => {
  const artist = new Artist(req.body);
  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateArtist = async (req, res) => {
  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArtist = async (req, res) => {
  try {
    await Artist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artist deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
