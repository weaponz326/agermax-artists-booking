// controllers/authController.js
const generateToken = require("../utils/generateToken");
const User = require("../models/User");


const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    // Optional fields are not initialized with defaults here
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
  } = req.body;

  try {

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password, 
      role,
      // Optional fields are added only if they are provided
      ...(profilePhoto && { profilePhoto }),
      ...(contactPhone && { contactPhone }),
      ...(address && { address }),
      ...(organizationNumber && { organizationNumber }),
      ...(socialMediaLinks && { socialMediaLinks }),
      ...(availableDates && { availableDates }),
      ...(gallery && { gallery }),
      ...(eventsHosted && { eventsHosted }),
      ...(nickName && { nickName }),
      ...(genre && { genre }),
      ...(bio && { bio }),
      ...(companyName && { companyName }),
    });

    if (user) {
      res.status(201).json({
        userData: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.firstName + " " + user.lastName, 
          email: user.email,
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

module.exports = {
  registerUser,
  loginUser,
};
