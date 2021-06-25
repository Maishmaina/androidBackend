import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
//initialization of server
const app = express();
app.use(cors());
app.options("*", cors());
dotenv.config();
connectDB();
app.use(morgan("tiny"));

//declaration of constants
const api = process.env.API_URL;

// req.body for post request
app.use(express.json());

//routes
app.use(`${api}/products`, productRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);

//setUp/start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});