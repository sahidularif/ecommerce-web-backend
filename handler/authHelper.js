const { verify } = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    const decoded = verify(token, process.env.JWT_SECRET);
    const { user } = decoded;
    req.user = user;
    next()
  } catch (err) {
    res.status(401).send(err);
    // next("Authentication failure!");
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
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("Access denied. Not admin...");
    }
  });
};

module.exports = { verifyToken, isUser, isAdmin };
