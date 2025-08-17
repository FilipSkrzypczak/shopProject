const express = require("express");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middleware/AuthMiddleware.js");
const generateToken = require("../utils/generateToken.js");
const User = require("./../Models/UserModel.js"); 

const userRouter = express.Router();

// LOGIN
userRouter.post(
   "/login",
   asyncHandler(async (req, res) => {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user && (await user.matchPassword(req.body.password))) {
         const { password, updatedAt, ...others } = user._doc;
         res.json({
            ...others,
            token: generateToken(user._id),
         });
      } else {
         res.status(401);
         throw new Error("Niepoprawny E-mail lub Hasło");
      }
   })
);

// REGISTER
userRouter.post(
   "/",
   asyncHandler(async (req, res) => {
      const { email } = req.body;
      const userExists = await User.findOne({ email });

      if (userExists) {
         res.status(400);
         throw new Error("E-mail już istnieje");
      }

      const { ...body } = req.body;

      const user = await User.create(body);

      if (user) {
         const { password, updatedAt, ...others } = user._doc;
         res.status(201).json({
            ...others,
         });
      } else {
         res.status(400);
         throw new Error("Niepoprawne dane");
      }
   })
);

// UPDATE PROFILE
userRouter.put(
   "/profile",
   protect,
   asyncHandler(async (req, res) => {
      const user = await User.findById(req.user._id);

      if (user) {
         user.name = req.body.name || user.name;
         user.email = req.body.email || user.email;
         if (req.body.password) {
            user.password = req.body.password;
         }
         const updatedUser = await user.save();
         const { password, updatedAt, ...other } = updatedUser._doc;
         res.json({
            ...other,
            token: generateToken(updatedUser._id),
         });
      } else {
         res.status(404);
         throw new Error("Użytkownik nieznaleziony");
      }
   })
);

// GET ALL USER ADMIN
userRouter.get(
   "/",
   protect,
   admin,
   asyncHandler(async (req, res) => {
      const users = await User.find({}, { password: 0 });
      res.json(users);
   })
);

module.exports = userRouter;
