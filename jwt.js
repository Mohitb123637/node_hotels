const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  // first check the request headers authorization or not
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: 'Token not found' });

  // Extract the jwt from the request header
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Invalid authorization' });
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// function to generate token
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 3000 });
};

module.exports = { jwtAuthMiddleware, generateToken };
