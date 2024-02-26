// routes/authRoutes.js
const generateToken = require("../utils/generateToken");

const express = require("express");
const passport = require("passport");
const { body } = require("express-validator");
const { protect, adminProtect } = require("../middleware/authMiddleware");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  resetPasswordByAdmin
} = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

router.post(
  "/register",
  [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
    body("role").notEmpty().withMessage("Role is required"),
  ],
  registerUser
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per windowMs
  message:
    "Too many login attempts from this IP, please try again after 15 minutes",
});

router.post("/login", loginLimiter, loginUser);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", protect, changePassword);
router.post('/reset-password-by-admin', protect, adminProtect,resetPasswordByAdmin);



//facebook Oauth
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
