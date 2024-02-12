// controllers/authController.js
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const Artist = require("../models/Artist");
const EventOrganizer = require("../models/EventOrganizer");
const Admin = require("../models/Admin");

const getAllUsers = async (req, res) => {
  try {
    // Exclude the password field from the results
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email, // This is the incoming email field for User
    password,
    role,
    profilePhoto = "",
    contactPhone = "",
    address = "",
    organizationNumber = "",
    socialMediaLinks,
    availableDates,
    gallery,
    eventsHosted,
    nickName = "",
    genre,
    bio = "",
    companyName = "",
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email, // Use as email in User model
      password,
      role,
      profilePhoto,
      contactPhone,
      address,
      organizationNumber,
      socialMediaLinks,
      availableDates,
      gallery,
      eventsHosted,
      nickName,
      genre,
      bio,
      companyName,
    });

    if (user) {
      let additionalDetails = {
        firstName,
        lastName,
        contactEmail: email,
        contactPhone,
        address,
        profilePhoto,
      };

      // Use switch-case for role handling
      switch (role) {
        case "artist":
          await Artist.create({
            ...additionalDetails,
            nickName,
            genre,
            bio,
            organizationNumber,
            socialMediaLinks,
            availableDates,
            gallery,
          });
          break;
        case "organizer":
          await EventOrganizer.create({
            ...additionalDetails,
            companyName,
            organizationNumber,
            eventsHosted,
          });
          break;
        case "admin":
          await Admin.create({ ...additionalDetails, role });
          break;
        default:
          // Handle unexpected role
          throw new Error("Invalid user role");
      }

      res.status(201).json({
        userData: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.firstName + " " + user.lastName,
          email,
          role: user.role,
          profilePhoto: user.profilePhoto,
        },
        accessToken: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      accessToken: generateToken(user._id),
      userData: {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
        contactPhone: user.contactPhone,
        address: user.address,
        nickName: user.nickName,
        genre: user.genre,
        bio: user.bio,
        companyName: user.companyName,
        organizationNumber: user.organizationNumber,
        socialMediaLinks: user.socialMediaLinks,
        availableDates: user.availableDates,
        gallery: user.gallery,
        eventsHosted: user.eventsHosted,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
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
          fullName: user.firstName + " " + user.lastName,
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

const updateUserDetails = async (req, res) => {
  const userId = req.user._id;
  const role = req.user.role;
  const updateData = req.body;

  try {
    // Dynamically construct update fields based on role
    let userUpdateFields = {
      firstName: updateData.firstName,
      lastName: updateData.lastName,
      email: updateData.email,
      contactPhone: updateData.contactPhone,
      address: updateData.address,
      profilePhoto: updateData.profilePhoto,
    };

    // Extend userUpdateFields with role-specific fields
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
    } else if (role === "organizer") {
      Object.assign(userUpdateFields, {
        companyName: updateData.companyName,
        organizationNumber: updateData.organizationNumber,
        eventsHosted: updateData.eventsHosted,
      });
    } else if (role === "admin") {
      Object.assign(userUpdateFields, {});
    }

    await User.findByIdAndUpdate(userId, userUpdateFields, { new: true });
    res.json({ message: "User details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserProfile,
  updateUserDetails,
};
