const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer configuration for handling file uploads
const profilePhotoUpload = multer({ dest: "uploads/user/profile_photo/" });
const galleryUpload = multer({ dest: "uploads/user/artist_gallery/" });

// Middleware for parsing JSON and multipart form data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/users", userController.getAllUsers);
router.route("/profile").get(protect, userController.getUserProfile);
router
  .route("/profile")
  .put(
    protect,
    profilePhotoUpload.single("profilePhoto"),
    galleryUpload.array("gallery", 10),
    userController.updateUserDetails
  );

router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserDetailsById);

router.delete("/users/:id", userController.deleteUser);

module.exports = router;
