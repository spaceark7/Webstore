import express from "express";
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controller/orderController.js";
import Protect from "../middleWare/userAuthMiddleware.js";
const router = express.Router();

// @desc   create order request
// @route  GET / api/orders/
// @access private
router.route("/").post(Protect, addOrderItems);
router.route("/:id").get(Protect, getOrderById);
router.route("/:id/pay").put(Protect, updateOrderToPaid);

export default router;
