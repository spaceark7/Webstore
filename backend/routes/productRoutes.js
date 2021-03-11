import express from "express";
import {
  getProductById,
  getProducts,
  deleteProductById,
} from "../controller/productsController.js";

import { Protect, admin } from "../middleWare/userAuthMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(Protect, admin, deleteProductById);

export default router;
