import express from "express";
import { getOrders, addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/jwtSecure.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(protect, getOrders).post(protect, addOrderItems);

export default router;
