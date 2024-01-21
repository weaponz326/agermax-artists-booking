const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.getAllAdmin);
router.get('/admin/:id', adminController.getAdminById);
router.post('/admin', adminController.createAdmin);
router.put('/admin/:id', adminController.updateAdmin);
router.delete('/admin/:id', adminController.deleteAdmin);

module.exports = router;
