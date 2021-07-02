import express from "express";
import {
  getUsers,
  registerUser,
  getSingleUser,
  loginUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/jwtSecure.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(protect, admin, getUsers).post(registerUser);
router.route("/:id").get(protect, getSingleUser);
router.post("/login", loginUser);

export default router;
