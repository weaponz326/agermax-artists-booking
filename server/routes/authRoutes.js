// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
