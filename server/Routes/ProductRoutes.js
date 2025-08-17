const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("./../Models/ProductModel.js");
const { admin, protect } = require("./../Middleware/AuthMiddleware.js");

const productRoute = express.Router();

// GET ALL PRODUCT
productRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const category = req.query.category
      ? {
          categories: {
            $in: req.query.category,
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const { ...key } = keyword;
    const query = { key, ...category };
    const products = await Product.find(query)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET PRODUCT REVIEWS
productRoute.get(
  "/reviews",
  protect,
  asyncHandler(async (req, res) => {
    const products = await Product.find(
      {
        reviews: { $elemMatch: { user: req.user._id } },
      },
      { reviews: { $elemMatch: { user: req.user._id } }, name: 1 }
    );

    const reviews = products.map((i) => ({
      productName: i.name,
      id: i._id,
      review: i.reviews[0],
    }));

    if (products) {
      res.status(201).json(reviews);
    } else {
      res.status(404);
      throw new Error("Brak znalezionych opinii");
    }
  })
);

// GET ALL REVIEWS
productRoute.get(
  "/all/reviews",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find(
      { reviews: { $not: { $size: 0 } } },
      { reviews: 1, name: 1, rating: 1 }
    );

    if (products) {
      res.status(201).json(products);
    } else {
      res.status(404);
      throw new Error("Brak opinii");
    }
  })
);

// GET SINGLE PRODUCT
productRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Produkt nieznaleziony");
    }
  })
);

// PRODUCT REVIEW
productRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Produkt już został oceniony");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);
      // product.reviews.sort((a, b) => b.rating - a.rating);
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Opinia Dodana" });
    } else {
      res.status(404);
      throw new Error("Produkt nieznaleziony");
    }
  })
);

// DELETE PRODUCT
productRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ message: "Produkt nieznaleziony" });
    } else {
      res.status(404);
      throw new Error("Produkt nieznaleziony");
    }
  })
);

// CREATE PRODUCT
productRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      countInStock,
      categories,
      isActive,
    } = req.body;
    const productExist = await Product.findOne({ name });
    if (productExist) {
      res.status(400);
      throw new Error("Nazwa produktu już istnieje");
    } else {
      const product = new Product({
        name,
        price,
        description,
        categories,
        image,
        countInStock,
        isActive,
        user: req.user._id,
      });
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Niepoprawne dane");
      }
    }
  })
);

// UPDATE PRODUCT
productRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      image,
      countInStock,
      categories,
      isActive,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.image = image || product.image;
      product.countInStock = countInStock || product.countInStock;
      product.categories = categories || product.categories;
      product.isActive = isActive || product.isActive;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Produkt nieznaleziony");
    }
  })
);

module.exports = productRoute;
