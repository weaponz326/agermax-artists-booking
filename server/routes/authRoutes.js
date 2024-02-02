// routes/authRoutes.js
const express = require('express');
const multer  = require('multer');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {getAllUsers, registerUser, loginUser, getUserProfile, updateUserDetails } = require('../controllers/authController');

const profilePhotoUpload = multer({ dest: 'uploads/user/profile_photo/' });
const galleryUpload = multer({ dest: 'uploads/user/artist_gallery/' });

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, profilePhotoUpload.single('profilePhoto'), galleryUpload.array('gallery', 10), updateUserDetails);

module.exports = router;
