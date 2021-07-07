import express from "express";
import {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/jwtSecure.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(protect, getOrders).post(protect, addOrderItems);
router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

export default router;
