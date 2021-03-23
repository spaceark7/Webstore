import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  getAllOrders,
  updateOrderToDelivered,
} from '../controller/orderController.js'
import { Protect, admin } from '../middleWare/userAuthMiddleware.js'
const router = express.Router()

router.route('/').post(Protect, addOrderItems).get(Protect, admin, getAllOrders)
router.route('/myorders').get(Protect, getOrders)
router.route('/:id').get(Protect, getOrderById)
router.route('/:id/pay').put(Protect, updateOrderToPaid)
router.route('/:id/deliver').put(Protect, admin, updateOrderToDelivered)

export default router
