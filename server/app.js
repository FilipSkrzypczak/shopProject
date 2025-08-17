const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoute = require("./Routes/ProductRoutes.js");
const categoryRoute = require("./Routes/categoryRoutes.js");
const userRouter = require("./Routes/UserRoutes.js");
const orderRouter = require("./Routes/OrderRoutes.js");
const authRouter = require("./Routes/AuthRoutes.js");
const { errorHandler, notFound } = require("./Middleware/Errors.js");

dotenv.config();

// Połączenie z lokalnym MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Połączono lokalnie"))
  .catch((err) => console.error("Błąd połączenia z MongoDB:", err));

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use("/api/products", productRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/auth", authRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server działa na porcie ${PORT}`));
