import express from "express";
import {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/categoriesController.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(getCategories).post(addCategory);
router
  .route("/:id")
  .delete(deleteCategory)
  .get(getCategoryById)
  .put(updateCategory);

export default router;
