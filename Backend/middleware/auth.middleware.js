const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const BlacklistToken = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization?.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    req.userId = user._id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.captain = captain;
    req.userId = captain._id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
