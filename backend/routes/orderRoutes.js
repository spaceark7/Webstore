import express from "express";
import { addOrderItems } from "../controller/orderController.js";
import Protect from "../middleWare/userAuthMiddleware.js";
const router = express.Router();

// @desc   create order request
// @route  GET / api/orders/
// @access private
router.route("/").post(Protect, addOrderItems);

export default router;
