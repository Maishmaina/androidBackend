import express from "express";
import {
  getUsers,
  registerUser,
  getSingleUser,
  loginUser,
} from "../controllers/userController.js";

//instantiate express
const router = express.Router();

router.route(`/`).get(getUsers).post(registerUser);
router.route("/:id").get(getSingleUser);
router.post("/login", loginUser);

export default router;
