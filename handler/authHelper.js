const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.headers["x-access-token"]
  // console.log(token)
  if (!token){
    console.log('not token')
    return res.status(401).send("Access denied. Not authenticated...");
  }
    
  try {
    const jwtSecretKey = `${process.env.JWT_SECRET}`;
    const decoded = jwt.verify(token, jwtSecretKey);
    const currentDate = new Date();
    if(decoded.exp * 1000 <currentDate.getTime()){
      return res.status(403).send("Token expired! Please login again")
    }
    req.user = decoded;
    console.log('req.user')
    next();
  } catch (ex) {
    console.log('invalid token');
    res.status(403).send("Invalid auth token...");
  }
};

// For User Profile
const isUser = (req, res, next) => {
  auth(req, res, () => {
    if (req.user._id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not authorized...");
    }
  });
};

// For Admin
const isAdmin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not admin...");
    }
  });
};

module.exports = { auth, isUser, isAdmin };
