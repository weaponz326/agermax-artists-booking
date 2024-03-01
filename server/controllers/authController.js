// controllers/authController.js
const generateToken = require("../utils/generateToken");
const User = require("../models/User");
const sendEmail = require("../utils/mailSender");
const generateResetToken = require("../utils/generateResetToken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
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
      // Attempt to send a welcome email
      const subject = "Welcome to Our Platform!";
      const text = `Hi ${firstName}, welcome to our platform! We are excited to have you onboard.`;
      const html = `<p>Hi ${firstName},</p><p>Welcome to our platform! We are excited to have you onboard.</p>`;

      sendEmail({
        to: email,
        subject: subject,
        text: text,
        html: html,
      }).catch((error) => {
        // Log the error for internal tracking
        console.error("Failed to send welcome email:", error);
      });

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
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const addUser = async (req, res) => {
  const { firstName, lastName, email, role, ...additionalFields } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a placeholder password, which will be hashed automatically by your model's pre-save hook
    const placeholderPassword = `Placeholder-${Date.now()}`;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: placeholderPassword,
      role,
      ...additionalFields,
    });

    if (user) {
      // Generate reset token without hashing it here, as the hash will be stored in the database
      const { resetToken, hash, resetTokenExpire } = generateResetToken();

      // Store the hashed version of the token and its expiration in the database
      user.resetPasswordToken = hash;
      user.resetPasswordExpire = resetTokenExpire;
      await user.save();

      // Construct the reset password URL with the unhashed token
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
      const subject = "Complete Your Registration";
      const text = `Welcome to our platform! Please complete your registration by setting your password. Click the link below to set up your password: ${resetUrl}`;
      const html = `<p>Welcome to our platform!</p><p>Please complete your registration by setting your password. Click the link below to set up your password:</p><p><a href="${resetUrl}">Set Your Password</a></p>`;

      sendEmail({
        to: email,
        subject: subject,
        text: text,
        html: html,
      }).catch((error) => {
        console.error("Failed to send password reset email:", error);
      });

      res.status(201).json({
        message:
          "User added successfully. A link to set your password has been sent via email.",
        userData: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          ...additionalFields,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error adding user:", error);
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
      console.log(`Password reset attempted for non-existing email: ${email}`);
      return res.status(200).json({
        message:
          "If your account exists, you will receive a password reset email.",
      });
    }

    const { resetToken, hash, resetTokenExpire } = generateResetToken();
    user.resetPasswordToken = hash;
    user.resetPasswordExpire = resetTokenExpire;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. If you did not request this, please ignore this email and your password will remain unchanged.`;
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
      html: emailBody,
    });

    res
      .status(200)
      .json({ message: "Email sent with password reset instructions." });
  } catch (error) {
    if (error.message.includes("Error sending email")) {
      // This condition checks for SMTP errors
      console.error(`SMTP Error for ${email}:`, error);
      res.status(500).json({
        message: "Failed to send password reset email. Please try again later.",
      });
    } else {
      // Handle other errors
      console.error(
        `Internal error during password reset for ${email}:`,
        error
      );
      res.status(500).json({
        message: "An error occurred while processing your request.",
      });
    }
  }
};


const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  // Hash the provided resetToken for comparison
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken: hashedToken, // Use the hashed token for comparison
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

const resetPasswordByAdmin = async (req, res) => {
  const { userId, newPassword } = req.body;
  const adminUserId = req.user._id;

  try {
    const adminUser = await User.findById(adminUserId);
    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();

    // Optionally, send an email to the user notifying them about the password change
    const subject = "Your Password Has Been Reset";
    const text = `Your password has been reset by an administrator. If you did not request this, please contact support immediately.`;
    const html = `<p>${text}</p>`;

    sendEmail({
      to: user.email,
      subject: subject,
      text: text,
      html: html,
    }).catch((error) => {
      console.error("Failed to send password reset notification email:", error);
    });

    res
      .status(200)
      .json({ message: "User's password has been reset successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

module.exports = {
  registerUser,
  addUser,
  loginUser,
  forgotPassword,
  resetPassword,
  changePassword,
  resetPasswordByAdmin,
};
