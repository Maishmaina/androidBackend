import express from "express";
import {
  getOrders,
  addOrderItems,
  getOrderById,
  updateOrder,
  deleteOrder,
  getTotalSales,
  countOrder,
  getOrderByUserId,
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
router.get("/get/totalsales", protect, admin, getTotalSales);
router.get("/get/countOrders", protect, admin, countOrder);
router.get("/get/userorders/:userid", protect, getOrderByUserId);

export default router;
