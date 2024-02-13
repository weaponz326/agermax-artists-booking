// routes/authRoutes.js
const generateToken = require("../utils/generateToken");

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
// Google OAuth callback, modified to redirect with accessToken and user data
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    const accessToken = generateToken(req.user);
    const user = req.user;
    const userData = encodeURIComponent(
      JSON.stringify({
        _id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        // Add other non-sensitive fields as needed
      })
    );

    // Redirect to the frontend with the accessToken and userData as query parameters
    res.redirect(
      `${process.env.FRONTEND_URL}/admin/home?accessToken=${accessToken}&userData=${userData}`
    );
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
