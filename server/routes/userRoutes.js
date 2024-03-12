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

router.route("/users").get(userController.getAllUsers);
router.route("/users/:id").get(userController.getUserById);

const upload = multer({ storage: multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "profilePhoto") {
      cb(null, "uploads/user/profile_photo/");
    } else if (file.fieldname === "gallery") {
      cb(null, "uploads/user/artist_gallery/");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
})});

// Adjust your route to use this new upload middleware
router.route("/profile").put(protect, upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), userController.updateUserDetails);

router.route("/users/:id").put(upload.fields([{ name: 'profilePhoto', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), userController.updateUserDetailsById);


router.delete("/users/:id", userController.deleteUser);

// Route for getting the total number of users by user role
router.get("/total-artists", userController.getTotalArtists);
router.get("/total-organizers", userController.getTotalOrganizers);

// Route for getting the three most recent users
router.get("/recent-users", userController.getRecentUsers);

module.exports = router;
