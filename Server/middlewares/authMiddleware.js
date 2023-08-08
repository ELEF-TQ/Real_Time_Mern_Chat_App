const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const AuthProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token:", decoded);

      try {
        req.user = await User.findById(decoded.userId).select("-password");
        // console.log("req.user:", req.user);
      } catch (error) {
        console.error("User findById error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
      

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { AuthProtect };