import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoriesController.js";
import { protect, admin } from "../middleware/jwtSecure.js";
//instantiate express
const router = express.Router();

router.route(`/`).get(getCategories).post(protect, admin, addCategory);
router
  .route("/:id")
  .delete(protect, admin, deleteCategory)
  .get(getCategoryById)
  .put(protect, admin, updateCategory);

export default router;
