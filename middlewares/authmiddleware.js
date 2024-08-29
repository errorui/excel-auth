const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Try to get the token from the cookies or authorization header
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ err: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.id).select("-password");
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ err: "Not authorized, token failed" });
  }
};

module.exports = { protect };
