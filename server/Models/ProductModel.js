const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
   {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
   },
   {
      timestamps: true,
   }
);

const productSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      image: {
         type: String,
      },
      description: {
         type: String,
      },
      categories: {
         type: Array,
         default: [],
      },
      reviews: [reviewSchema],
      rating: {
         type: Number,
         required: true,
         default: 0,
      },
      price: {
         type: Number,
         required: true,
         default: 0,
      },
      countInStock: {
         type: Number,
         required: true,
         default: 0,
      },
      isActive: {
         type: Boolean,
         required: true,
         default: false,
      },
   },
   {
      timestamps: true,
   }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
