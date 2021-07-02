import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoriesController.js";
import { protect } from "../middleware/jwtSecure.js";
//instantiate express
const router = express.Router();

router.route(`/`).get(getCategories).post(protect, addCategory);
router
  .route("/:id")
  .delete(protect, deleteCategory)
  .get(getCategoryById)
  .put(protect, updateCategory);

export default router;
