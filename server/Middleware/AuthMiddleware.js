const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user =
        decoded.type === "guest"
          ? decoded
          : await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Brak autoryzacji, błąd tokena");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Brak autoryzacji, brak tokena");
  }
});

const admin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json("Brak autoryzacji");
  }
};

module.exports = { admin, protect };
