// paymentRoutes.js

const express = require('express');
const router = express.Router();
const { processPayment, getAllPayments, getPaymentById } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/process-payment', protect, processPayment);
router.get('/payments/:id', getPaymentById);
router.get('/payments', getAllPayments);


module.exports = router;
