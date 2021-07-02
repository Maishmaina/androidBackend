import express from "express";
import {
  getUsers,
  registerUser,
  getSingleUser,
  loginUser,
  countUsers,
  deleteUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/jwtSecure.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(protect, admin, getUsers).post(registerUser);
router
  .route("/:id")
  .get(protect, getSingleUser)
  .delete(protect, admin, deleteUser);
router.post("/login", loginUser);
router.route("/get/countUsers").get(countUsers);
export default router;
