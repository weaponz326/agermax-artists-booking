const express = require('express');
const multer  = require('multer');
const router = express.Router();
const adminController = require('../controllers/adminController');

const profilePhotoUpload = multer({ dest: 'uploads/user/profile_photo/' });
  
router.get('/admin', adminController.getAllAdmin);
router.get('/admin/:id', adminController.getAdminById);
router.post('/admin', profilePhotoUpload.single('profilePhoto'), adminController.createAdmin);
router.put('/admin/:id', profilePhotoUpload.single('profilePhoto'), adminController.updateAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;
