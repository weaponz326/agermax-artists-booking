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
  const role = req.user.role;
  const updateData = req.body;

  try {
    let userUpdateFields = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      contactPhone: updateData.contactPhone,
      address: updateData.address,
      profilePhoto: updateData.profilePhoto,
    };

    if (role === "artist") {
      Object.assign(userUpdateFields, {
        nickName: updateData.nickName,
        genre: updateData.genre,
        bio: updateData.bio,
        organizationNumber: updateData.organizationNumber,
        socialMediaLinks: updateData.socialMediaLinks,
        availableDates: updateData.availableDates,
        gallery: updateData.gallery,
      });
      await Artist.findOneAndUpdate({ user: userId }, userUpdateFields);
    } else if (role === "organizer") {
      Object.assign(userUpdateFields, {
        companyName: updateData.companyName,
        organizationNumber: updateData.organizationNumber,
        eventsHosted: updateData.eventsHosted,
      });
      await EventOrganizer.findOneAndUpdate({ user: userId }, userUpdateFields);
    } else if (role === "admin") {
      await Admin.findOneAndUpdate({ user: userId }, userUpdateFields);
    }

    await User.findByIdAndUpdate(userId, userUpdateFields, { new: true });
    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateUserDetailsById = async (req, res) => {
  const targetUserId = req.params.id; // Get the user ID from the request parameters
  const updateData = req.body;

  try {
    // Retrieve the user to update to check their role
    const userToUpdate = await User.findById(targetUserId);
    if (!userToUpdate) {
      return res.status(404).json({ message: "User not found" });
    }
    const role = userToUpdate.role;

    let userUpdateFields = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      contactPhone: updateData.contactPhone,
      address: updateData.address,
      profilePhoto: updateData.profilePhoto,
    };

    // Depending on the role, add specific fields
    if (role === "artist") {
      Object.assign(userUpdateFields, {
        nickName: updateData.nickName,
        genre: updateData.genre,
        bio: updateData.bio,
        organizationNumber: updateData.organizationNumber,
        socialMediaLinks: updateData.socialMediaLinks,
        availableDates: updateData.availableDates,
        gallery: updateData.gallery,
      });
      await Artist.findOneAndUpdate({ user: targetUserId }, userUpdateFields);
    } else if (role === "organizer") {
      Object.assign(userUpdateFields, {
        companyName: updateData.companyName,
        organizationNumber: updateData.organizationNumber,
        eventsHosted: updateData.eventsHosted,
      });
      await EventOrganizer.findOneAndUpdate({ user: targetUserId }, userUpdateFields);
    } else if (role === "admin") {
      await Admin.findOneAndUpdate({ user: targetUserId }, userUpdateFields);
    }

    // Update the general user fields
    await User.findByIdAndUpdate(targetUserId, userUpdateFields, { new: true });
    res.json({ message: "User details updated successfully" });
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
