//routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer configuration for handling file uploads
const profilePhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user/profile_photo/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const profilePhotoUpload = multer({ storage: profilePhotoStorage });

const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/user/artist_gallery/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const galleryUpload = multer({ storage: galleryStorage });

// Middleware for parsing JSON and multipart form data
router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb", extended: true }));

router.route("/profile").get(protect, userController.getUserProfile);
router
  .route("/profile")
  .put(
    protect,
    profilePhotoUpload.single("profilePhoto"),
    galleryUpload.array("gallery", 10),
    userController.updateUserDetails
  );

router.route("/users").get(userController.getAllUsers);

router.route("/users/:id").get(userController.getUserById);
router
  .route("/users/:id")
  .put(
    profilePhotoUpload.single("profilePhoto"),
    galleryUpload.array("gallery", 10),
    userController.updateUserDetailsById
  );

router.delete("/users/:id", userController.deleteUser);

// Route for getting the total number of users by user role
router.get("/total-artists", userController.getTotalArtists);
router.get("/total-organizers", userController.getTotalOrganizers);

// Route for getting the three most recent users
router.get("/recent-users", userController.getRecentUsers);

module.exports = router;
