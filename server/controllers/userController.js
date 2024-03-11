// controllers/userController.js
const User = require("../models/User");

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
  const { password, profilePhoto, gallery, ...updateData } = req.body;

  try {
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        ...updateData,
        profilePhoto: profilePhoto || undefined, // Update profile photo if provided
        gallery: gallery || undefined, // Update gallery if provided
      },
      { new: true }
    ).select("-password");

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User details updated successfully",
      userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserDetailsById = async (req, res) => {
  console.log("Controller user route called!");
  const targetUserId = req.params.id;
  const { password, profilePhoto, gallery, ...updateData } = req.body;

  try {
    const userExists = await User.exists({ _id: targetUserId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details in the database
    const updatedUser = await User.findByIdAndUpdate(
      targetUserId,
      {
        ...updateData,
        profilePhoto: profilePhoto || undefined, // Update profile photo if provided
        gallery: gallery || undefined, // Update gallery if provided
      },
      { new: true }
    ).select("-password"); // Exclude password field in the response

    res.json({
      message: "User details updated successfully",
      updatedUser,
    });
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

//Get Total Number of Artists
const getTotalArtists = async (req, res) => {
  try {
    const totalArtists = await User.countDocuments({ role: "artist" });
    res.status(200).json({ totalArtists });
  } catch (error) {
    console.error("Error retrieving total artists:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get Total Number of organizers
const getTotalOrganizers = async (req, res) => {
  try {
    const totalOrganizers = await User.countDocuments({ role: "organizer" });
    res.status(200).json({ totalOrganizers });
  } catch (error) {
    console.error("Error retrieving total organizers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecentUsers = async (req, res) => {
  try {
    const recentUsers = await User.find({}, { password: 0 }) // Excluding password field
      .sort({ createdAt: -1 })
      .limit(3);

    if (!recentUsers || recentUsers.length === 0) {
      return res.status(404).json({ message: "No recent users found" });
    }

    res.status(200).json({ recentUsers });
  } catch (error) {
    console.error("Error retrieving recent users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  getUserById,
  updateUserDetails,
  updateUserDetailsById,
  deleteUser,
  getTotalArtists,
  getTotalOrganizers,
  getRecentUsers,
};
