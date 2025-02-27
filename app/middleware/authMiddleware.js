const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  console.log("token ==",token);
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    console.log("decode id =",decoded.userId);
    
    req.user = await User.findById(decoded.userId);
    if (!req.user) return res.status(404).json({ message: 'User not found' });
    next();
  } catch (error) {
    console.log("error",error);
    
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
