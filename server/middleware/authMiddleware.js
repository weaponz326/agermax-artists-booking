const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    next();
  };
  
  module.exports = {
    authenticate,
  };
  