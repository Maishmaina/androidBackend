import express from "express";
import {
  getProducts,
  createdProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  countProduct,
  featuredProduct,
  uploadImageGallery,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/jwtSecure.js";
import { uploadOptions } from "../middleware/imageUploadHandler.js";

//instantiate express
const router = express.Router();

router
  .route(`/`)
  .get(getProducts)
  .post(protect, admin, uploadOptions.single("image"), createdProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/get/countProducts").get(countProduct);
router.route("/get/featuredProducts/:count").get(featuredProduct);
router
  .route("/gallery-images/:id")
  .put(protect, admin, uploadOptions.array("images", 5), uploadImageGallery);
export default router;
