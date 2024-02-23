const express = require('express');
const multer  = require('multer');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

const profilePhotoUpload = multer({ dest: 'uploads/user/profile_photo/' });
const galleryUpload = multer({ dest: 'uploads/user/invoice_gallery/' });

router.get('/invoice', invoiceController.getAllinvoice);
router.get('/invoice/:id', invoiceController.getinvoiceById);
router.post('/invoice', profilePhotoUpload.single('profilePhoto'), galleryUpload.array('gallery', 10), invoiceController.createinvoice);
router.put('/invoice/:id', profilePhotoUpload.single('profilePhoto'), galleryUpload.array('gallery', 10), invoiceController.updateinvoice);
router.delete('/invoice/:id', invoiceController.deleteinvoice);

module.exports = router;
