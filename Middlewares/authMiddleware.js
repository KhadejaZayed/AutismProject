const jwt = require('jsonwebtoken');
const User = require('../Models/parentModel');

const authMiddleware = async (req, res, next) =>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: 'Not authorized, token missing'});
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  }catch (err){
    res.status(401).json({message: 'Invalid or expired token'});
  }
};

module.exports = authMiddleware;