const express = require("express");
const asyncHandler = require("express-async-handler");
const { admin, protect } = require("../Middleware/AuthMiddleware.js");
const Order = require("./../Models/OrderModel.js");

const orderRouter = express.Router();

// CREATE ORDER
orderRouter.post(
   "/",
   protect,
   asyncHandler(async (req, res) => {
      const {
         orderItems,
         shippingAddress,
         paymentMethod,
         shippingMethod,
         totalPrice,
         shippingPrice,
         comment,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
         res.status(400);
         throw new Error("Brak danych do zamówienia");
         return;
      } else {
         const order = new Order({
            orderItems,
            user: req.user,
            shippingAddress,
            paymentMethod,
            shippingMethod,
            totalPrice,
            shippingPrice,
            comment,
         });

         const createOrder = await order.save();
         res.status(201).json(createOrder);
      }
   })
);

// ADMIN GET ALL ORDERS
orderRouter.get(
   "/all",
   protect,
   admin,
   asyncHandler(async (req, res) => {
      const orders = await Order.find({})
         .sort({ _id: -1 })
         .populate("user", "id name email");
      res.json(orders);
   })
);
// USER LOGIN ORDERS
orderRouter.get(
   "/",
   protect,
   asyncHandler(async (req, res) => {
      const qLast = req.query.last;
      let order;

      if (qLast) {
         order = await Order.find({ user: req.user._id })
            .sort({
               _id: -1,
            })
            .limit(1);
      } else {
         order = await Order.find({ user: req.user._id }).sort({
            _id: -1,
         });
      }
      res.json(order);
   })
);

// GET ORDER BY ID
orderRouter.get(
   "/:id",
   protect,
   asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id).populate(
         "user",
         "name email"
      );

      if (order) {
         res.json(order);
      } else {
         res.status(404);
         throw new Error("Zamówienie nieznalezione");
      }
   })
);

// ORDER IS PAID
orderRouter.put(
   "/:id/pay",
   protect,
   asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);

      if (order) {
         order.isPaid = true;
         order.paidAt = Date.now();
         order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
         };

         const updatedOrder = await order.save();
         res.json(updatedOrder);
      } else {
         res.status(404);
         throw new Error("Zamówienie nieznalezione");
      }
   })
);

// ORDER IS DELIVERED
orderRouter.put(
   "/:id/delivered",
   protect,
   asyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);

      if (order) {
         order.isDelivered = true;
         order.deliveredAt = Date.now();

         const updatedOrder = await order.save();
         res.json(updatedOrder);
      } else {
         res.status(404);
         throw new Error("Zamówienie nieznalezione");
      }
   })
);

module.exports = orderRouter;
