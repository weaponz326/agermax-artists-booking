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

    users = users.map((user) => ({
      ...user,
      fullName: `${user.firstName} ${user.lastName}`,
      profilePhoto: user.profilePhoto
        ? `${process.env.APP_URL}${user.profilePhoto}`
        : "",
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
          profilePhoto: req.user.profilePhoto
            ? `${process.env.APP_URL}${req.user.profilePhoto}`
            : "",
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
    const userId = req.params.id;
    let user = await User.findById(userId).select("-password").lean(); // Use lean() for easier object modification

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepend APP_URL to profilePhoto if it exists
    if (user.profilePhoto) {
      user = {
        ...user,
        profilePhoto: `${process.env.APP_URL}${user.profilePhoto}`,
      };
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.user._id;
  const { password, ...updateData } = req.body;

  try {
    if (req.file) {
      updateData.profilePhoto =
        "/uploads/user/profile_photo/" + req.file.filename;
    }

    let userData = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    })
      .select("-password")
      .lean(); // Use lean for simpler object modification

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Dynamically construct the full URL for the profilePhoto if it exists
    if (userData.profilePhoto) {
      userData.profilePhoto = `${process.env.APP_URL}${userData.profilePhoto}`;
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
  const targetUserId = req.params.id;
  const { password, ...updateData } = req.body;

  try {
    if (req.file) {
      updateData.profilePhoto =
        "/uploads/user/profile_photo/" + req.file.filename;
    }

    let updatedUser = await User.findByIdAndUpdate(targetUserId, updateData, {
      new: true,
    })
      .select("-password")
      .lean(); // Use lean for simpler object modification

    // Dynamically construct the full URL for the profilePhoto if it exists
    if (updatedUser.profilePhoto) {
      updatedUser.profilePhoto = `${process.env.APP_URL}${updatedUser.profilePhoto}`;
    }

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
