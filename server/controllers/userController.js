// controllers/userController.js
const User = require("../models/User");
const Artist = require("../models/Artist");
const EventOrganizer = require("../models/EventOrganizer");
const Admin = require("../models/Admin");

// Create User is handled by the register function in authController.js)

const getAllUsers = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // Example filters based on possible query parameters
    if (query.role) {
      filter.role = query.role;
    }
    if (query.firstName) {
      filter.firstName = { $regex: query.firstName, $options: "i" }; // Case-insensitive search
    }
    if (query.lastName) {
      filter.lastName = { $regex: query.lastName, $options: "i" }; // Case-insensitive search
    }
    if (query.email) {
      filter.email = { $regex: query.email, $options: "i" }; // Case-insensitive search
    }

    let users = await User.find(filter).select("-password").lean();

    // Add fullName to each user object
    users = users.map((user) => ({
      fullName: `${user.firstName} ${user.lastName}`,
      ...user,
    }));

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    if (req.user) {
      const {
        _id,
        firstName,
        lastName,
        email,
        role,
        profilePhoto = "",
        contactPhone = "",
        address = "",
        nickName = "",
        genre = "",
        bio = "",
        companyName = "",
        organizationNumber = "",
        socialMediaLinks = [],
        availableDates = [],
        gallery = [],
        eventsHosted = [],
      } = req.user;

      res.json({
        userData: {
          _id,
          firstName,
          lastName,
          fullName: firstName + " " + lastName,
          email,
          role,
          profilePhoto,
          contactPhone,
          address,
          nickName,
          genre,
          bio,
          companyName,
          organizationNumber,
          socialMediaLinks,
          availableDates,
          gallery,
          eventsHosted,
        },
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming you're getting the user ID from the URL parameters
    const user = await User.findById(userId).select("-password"); // Exclude the password field for security

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.user._id;
  const updateData = req.body;

  try {
    // Directly update the user document with provided data
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    // res.json({ message: "User details updated successfully" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserDetailsById = async (req, res) => {
  const targetUserId = req.params.id;
  const updateData = req.body;

  try {
    // Ensure the user exists before attempting to update
    const userExists = await User.exists({ _id: targetUserId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's details
    const updatedUser = await User.findByIdAndUpdate(targetUserId, updateData, {
      new: true,
    });
    // res.json({ message: "User details updated successfully" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUserDetails,
  updateUserDetailsById,
  deleteUser,
};
