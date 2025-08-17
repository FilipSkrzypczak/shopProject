const express = require("express");
const asyncHandler = require("express-async-handler");
// const { admin, protect } = require("./../Middleware/AuthMiddleware.js");
const jwt = require("jsonwebtoken");

const authRoute = express.Router();

// GENERATE TOKEN
authRoute.post(
   "/",
   asyncHandler(async (req, res) => {
      const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      const id =
         timestamp +
         "xxxxxxxxxxxxxxxx"
            .replace(/[x]/g, function () {
               return ((Math.random() * 16) | 0).toString(16);
            })
            .toLowerCase();
      if (id) {
         res.json(
            jwt.sign({ _id: id, type: "guest" }, process.env.JWT_SECRET, {
               expiresIn: "30d",
            })
         );
      } else {
         res.status(401);
         throw new Error("Bład generowania tokenu");
      }
   })
);

module.exports = authRoute;
