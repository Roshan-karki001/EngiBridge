const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to protect routes with JWT authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach the user info to the request object
    next(); // Allow the request to continue to the protected route
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
