import express from "express";
import { addOrderItems, getOrderById } from "../controller/orderController.js";
import Protect from "../middleWare/userAuthMiddleware.js";
const router = express.Router();

// @desc   create order request
// @route  GET / api/orders/
// @access private
router.route("/").post(Protect, addOrderItems);
router.route("/:id").get(Protect, getOrderById);

export default router;
