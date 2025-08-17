const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      orderItems: [
         {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            _id: {
               type: mongoose.Schema.Types.ObjectId,
               required: true,
               ref: "Product",
            },
         },
      ],
      shippingAddress: {
         name: { type: String, required: true },
         street: { type: String, required: true },
         city: { type: String, required: true },
         zip: { type: String, required: true },
         email: { type: String, required: true },
         phone: { type: String, required: true },
      },
      comment: { type: String },
      shippingMethod: {
         type: String,
         required: true,
      },
      paymentMethod: {
         type: String,
         required: true,
      },
      paymentResult: {
         id: { type: String },
         status: { type: String },
         update_time: { type: String },
         email_address: { type: String },
      },
      shippingPrice: {
         type: Number,
         required: true,
      },
      totalPrice: {
         type: Number,
         required: true,
      },
      status: {
         text: {
            type: String,
            required: true,
            default: "oczekiwanie na płatność",
         },
         isPaid: {
            type: Boolean,
            required: true,
            default: false,
         },
         paidAt: {
            type: Date,
         },
         isSent: {
            type: Boolean,
            required: true,
            default: false,
         },
         sentAt: {
            type: Date,
         },
         isDelivered: {
            type: Boolean,
            required: true,
            default: false,
         },
         deliveredAt: {
            type: Date,
         },
         isCancled: {
            type: Boolean,
            required: true,
            default: false,
         },
         cancledAt: {
            type: Date,
         },
      },
   },
   {
      timestamps: true,
   }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
