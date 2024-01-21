const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/eventOrganizerController');

router.get('/organizers', organizerController.getAllOrganizers);
router.get('/organizers/:id', organizerController.getOrganizerById);
router.post('/organizers', organizerController.createOrganizer);
router.put('/organizers/:id', organizerController.updateOrganizer);
router.delete('/organizers/:id', organizerController.deleteOrganizer);

module.exports = router;
