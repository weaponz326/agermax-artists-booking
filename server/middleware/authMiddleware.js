const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let accessToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get accessToken from header
      accessToken = req.headers.authorization.split(" ")[1];

      // Verify accessToken
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

      // Get user from the accessToken
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, accessToken failed" });
    }
  }

  if (!accessToken) {
    res.status(401).json({ message: "Not authorized, no accessToken" });
  }
};

const adminProtect = async (req, res, next) => {
  try {
    const userId = req.user._id; 

    const user = await User.findById(userId);
    if (user && user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. Requires admin role." });
    }
  } catch (error) {
    console.error("Admin verification error:", error);
    res
      .status(500)
      .json({ message: "Error verifying admin status", error: error.message });
  }
};

module.exports = {
  protect,
  adminProtect,
};
