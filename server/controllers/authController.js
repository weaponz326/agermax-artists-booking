// controllers/authController.js
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const sendEmail = require("../utils/mailSender");
const generateResetToken = require("../utils/generateResetToken");
const bcrypt = require("bcryptjs");

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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { resetToken, hash, resetTokenExpire } = generateResetToken();

    user.resetPasswordToken = hash;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. If you did not request this, please ignore this email and your password will remain unchanged.`;

    // Enhanced HTML Email Body
    const emailBody = `
      <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px; color: #333;">
        <h2 style="color: #0056b3;">Password Reset Request</h2>
        <p>${message}</p>
        <p><a href="${resetUrl}" style="display: inline-block; background-color: #0056b3; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>If the button above does not work, paste this link in your browser:</p>
        <p><a href="${resetUrl}" style="color: #0056b3;">${resetUrl}</a></p>
      </div>
    `;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
      html: emailBody, // Updated to use the styled HTML
    });

    res
      .status(200)
      .json({ message: "Email sent with password reset instructions" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error sending password reset email",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired password reset token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Remember to export the function
module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword, 
};
