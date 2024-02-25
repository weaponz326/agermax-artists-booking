const crypto = require('crypto');

const generateResetToken = () => {
  const resetToken = crypto.randomBytes(20).toString('hex');
  const hash = crypto.createHash('sha256').update(resetToken).digest('hex');
  const resetTokenExpire = Date.now() + 3600000; // 1 hour from now

  return { resetToken, hash, resetTokenExpire };
};

module.exports = generateResetToken;
