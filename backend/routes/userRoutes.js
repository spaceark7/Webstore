import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
} from "../controller/userController.js";
import { Protect, admin } from "../middleWare/userAuthMiddleware.js";
const router = express.Router();

// @desc   fetch all product
// @route  GET / api/products
// @access public
router.route("/").post(registerUser).get(Protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(Protect, getUserProfile)
  .put(Protect, updateUserProfile);

export default router;
