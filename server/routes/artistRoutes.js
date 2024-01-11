// routes/artistRoutes.js
const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');

router.get('/artists', artistController.getAllArtists);
router.get('/artists/:id', artistController.getArtistById);
router.post('/artists', artistController.createArtist);
router.put('/artists/:id', artistController.updateArtist);
router.delete('/artists/:id', artistController.deleteArtist);

module.exports = router;
