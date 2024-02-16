// paymentRoutes.js

const express = require('express');
const router = express.Router();
const { processPayment, getAllPayments } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/process-payment', protect, processPayment);
router.get('/payments', getAllPayments);


module.exports = router;
