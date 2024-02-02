const express = require('express');
const multer  = require('multer');
const router = express.Router();
const artistController = require('../controllers/artistController');

const profilePhotoUpload = multer({ dest: 'uploads/user/profile_photo/' });
const galleryUpload = multer({ dest: 'uploads/user/artist_gallery/' });

router.get('/artists', artistController.getAllArtists);
router.get('/artists/:id', artistController.getArtistById);
router.post('/artists', profilePhotoUpload.single('profilePhoto'), galleryUpload.array('gallery', 10), artistController.createArtist);
router.put('/artists/:id', profilePhotoUpload.single('profilePhoto'), galleryUpload.array('gallery', 10), artistController.updateArtist);
router.delete('/artists/:id', artistController.deleteArtist);

module.exports = router;
