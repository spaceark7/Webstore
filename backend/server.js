import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleWare/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

console.log(`${process.env.TOKEN_SECRET}`.red.inverse);

const App = express();
App.get("/", (req, res) => {
  res.send(`<p>Ho ho ho Server is Running ...<p>`);
});
App.use(express.json());
App.use("/api/products", productRoutes);
App.use("/api/users", userRoutes);
App.use("/api/orders", orderRoutes);
App.use(notFound);
App.use(errorHandler);

const PORT = process.env.PORT || 5000;

App.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode, on the port: ${PORT}`.black
      .bold.bgYellow
  )
);
