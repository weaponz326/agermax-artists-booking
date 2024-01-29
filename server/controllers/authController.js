const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Artist = require("../models/Artist");
const EventOrganizer = require("../models/EventOrganizer");
const Admin = require("../models/Admin");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email, // This is the incoming email field for User
    password,
    role,
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
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        role: user.role,
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
      userData: {
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accessToken: generateToken(user._id),
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
        contactPhone = "", // Set default values if field is not present
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
          email,
          role,
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
          accessToken: generateToken(_id)
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
    const userId = req.user._id; // Fetched from the auth middleware
    const role = req.user.role; // Fetched from the auth middleware
    const updateData = req.body; // Data to be updated
  
    try {
      // Update for the User model
      const userUpdateFields = {
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
        contactPhone: updateData.contactPhone,
        address: updateData.address,
        // Add other fields if necessary
      };
      await User.findByIdAndUpdate(userId, userUpdateFields);
  
      // Common fields for role-specific models
      const roleSpecificUpdateFields = {
        contactEmail: updateData.email,
        contactPhone: updateData.contactPhone,
        address: updateData.address,
        // Include fields common to all role-specific models
      };
  
      if (role === "artist") {
        await Artist.findOneAndUpdate(
          { contactEmail: req.user.email },
          {
            ...roleSpecificUpdateFields,
            nickName: updateData.nickName,
            genre: updateData.genre,
            bio: updateData.bio,
            organizationNumber: updateData.organizationNumber,
            socialMediaLinks: updateData.socialMediaLinks,
            availableDates: updateData.availableDates,
            gallery: updateData.gallery,
            // Add other artist-specific fields
          }
        );
      } else if (role === "organizer") {
        await EventOrganizer.findOneAndUpdate(
          { contactEmail: req.user.email },
          {
            ...roleSpecificUpdateFields,
            companyName: updateData.companyName,
            organizationNumber: updateData.organizationNumber,
            eventsHosted: updateData.eventsHosted,
            // Add other organizer-specific fields
          }
        );
      } else if (role === "admin") {
        await Admin.findOneAndUpdate(
          { contactEmail: req.user.email },
          {
            ...roleSpecificUpdateFields,
            // Add other admin-specific fields if necessary
          }
        );
      }
  
      res.json({ message: "User details updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserDetails,
};
