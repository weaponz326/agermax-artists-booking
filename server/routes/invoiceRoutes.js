const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');


router.get('/invoice', invoiceController.getAllInvoice);
router.get('/invoice/:id', invoiceController.getInvoiceById);
router.post('/invoice', invoiceController.createInvoice);
router.put('/invoice/:id', invoiceController.updateInvoice);
router.delete('/invoice/:id', invoiceController.deleteInvoice);

module.exports = router;
