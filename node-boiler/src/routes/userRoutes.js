import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  userLogin,
  resendOtp,
  otpMatch,
  setPassword,
  onBorading,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();
console.log("dsfdsfd");
router.get("/", authenticateUser, getAllUsers); // Protected route
router.post("/", createUser);
router.get("/:id", authenticateUser, getUserById); // Protected route
router.post("/login", userLogin);
router.post("/resendOtp", resendOtp);
router.post("/otpMatch", otpMatch);
router.post("/setPassword", setPassword);

router.post("/onBorading", authenticateUser, onBorading);

export default router;
