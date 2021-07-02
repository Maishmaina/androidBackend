import express from "express";
import {
  getProducts,
  createdProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  countProduct,
  featuredProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/jwtSecure.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(getProducts).post(protect, admin, createdProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/get/countProducts").get(countProduct);
router.route("/get/featuredProducts/:count").get(featuredProduct);
export default router;
