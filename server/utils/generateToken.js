const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user.
 * 
 * @param {Object} user - The user object.
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = generateToken;
