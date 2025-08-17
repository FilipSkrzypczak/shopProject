const express = require("express");
const asyncHandler = require("express-async-handler");
const Category = require("../Models/CategoryModel.js");
const Products = require("../Models/ProductModel.js");
const { admin, protect } = require("./../Middleware/AuthMiddleware.js");

const categoryRoute = express.Router();

// GET ALL CATEGORY
categoryRoute.get(
   "/",
   asyncHandler(async (req, res) => {
      const categories = await Category.find({}).sort({ _id: 1 });
      res.json(categories);
   })
);

// GET SINGLE CATEGORY
categoryRoute.get(
   "/:id",
   asyncHandler(async (req, res) => {
      const category = await Category.findById(req.params.id);
      if (category) {
         res.json(category);
      } else {
         res.status(404);
         throw new Error("Kategoria nieznaleziona");
      }
   })
);

// DELETE CATEGORY
categoryRoute.delete(
   "/:id",
   protect,
   admin,
   asyncHandler(async (req, res) => {
      const category = await Category.findById(req.params.id);
      if (category) {
         await Products.updateMany(
            { categories: { $in: category.name } },
            { $pull: { categories: { $in: category.name } } }
         );
         await category.remove();
         res.status(200).json("Kategoria usunięta pomyślnie.");
      } else {
         res.status(404);
         throw new Error("Kategoria nieznaleziona");
      }
   })
);

// CREATE CATEGORY
categoryRoute.post(
   "/",
   protect,
   admin,
   asyncHandler(async (req, res) => {
      const { name, permalink, desc } = req.body;
      const categoryExist = await Category.findOne({ permalink });
      if (categoryExist) {
         res.status(400);
         throw new Error("Nazwa ścieżki kategorii już istnieje");
      } else {
         const category = new Category({
            name,
            permalink,
            desc,
         });
         if (category) {
            const createdCategory = await category.save();
            res.status(201).json(createdCategory);
         } else {
            res.status(400);
            throw new Error("Niepoprawne dane");
         }
      }
   })
);

// UPDATE CATEGORY
categoryRoute.put(
   "/:id",
   protect,
   admin,
   asyncHandler(async (req, res) => {
      const { name, permalink, desc } = req.body;
      const category = await Category.findById(req.params.id);
      if (category) {
         category.name = name || category.name;
         category.permalink = permalink || category.permalink;
         category.desc = desc || category.desc;

         const updatedCategory = await category.save();
         res.json(updatedCategory);
      } else {
         res.status(404);
         throw new Error("Kategoria nieznaleziony");
      }
   })
);
module.exports = categoryRoute;
