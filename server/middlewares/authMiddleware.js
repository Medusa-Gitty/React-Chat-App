const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");

const auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Getting the token excluding bearer
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //Return user without the password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

module.exports = auth;
