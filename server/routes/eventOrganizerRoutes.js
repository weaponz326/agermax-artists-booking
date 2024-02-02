const express = require('express');
const multer  = require('multer');
const router = express.Router();
const organizerController = require('../controllers/eventOrganizerController');

const profilePhotoUpload = multer({ dest: 'uploads/user/profile_photo/' });

router.get('/organizers', organizerController.getAllOrganizers);
router.get('/organizers/:id', organizerController.getOrganizerById);
router.post('/organizers', profilePhotoUpload.single('profilePhoto'), organizerController.createOrganizer);
router.put('/organizers/:id', profilePhotoUpload.single('profilePhoto'), organizerController.updateOrganizer);
router.delete('/organizers/:id', organizerController.deleteOrganizer);

module.exports = router;
