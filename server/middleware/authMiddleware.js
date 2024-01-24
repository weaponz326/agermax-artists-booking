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


module.exports = {
  protect,
};
