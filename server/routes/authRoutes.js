// routes/authRoutes.js
const jwt = require('jsonwebtoken'); // Assuming you're using JWT


const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserDetails,
} = require("../controllers/authController");
const passport = require("passport");

const profilePhotoUpload = multer({ dest: "uploads/user/profile_photo/" });
const galleryUpload = multer({ dest: "uploads/user/artist_gallery/" });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getAllUsers);
router.route("/profile").get(protect, getUserProfile);
router
  .route("/profile")
  .put(
    protect,
    profilePhotoUpload.single("profilePhoto"),
    galleryUpload.array("gallery", 10),
    updateUserDetails
  );


// Function to generate a token (assuming you have this somewhere in your utilities)
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Adjust the expiresIn according to your needs
  });
};

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/admin/home`);
  }
);

// Google OAuth routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    const token = generateToken(req.user);
    // Successful authentication
    res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'None' }); // Modify according to your needs
    res.redirect(`${process.env.FRONTEND_URL}/admin/home`);
  }
);

// Twitter OAuth routes
router.get("/auth/twitter", passport.authenticate("twitter"));
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication
    res.redirect(`${process.env.FRONTEND_URL}/admin/home`);
  }
);

module.exports = router;
