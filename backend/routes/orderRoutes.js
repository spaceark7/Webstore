import express from 'express'
import {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from '../controller/orderController.js'
import Protect from '../middleWare/userAuthMiddleware.js'
const router = express.Router()

router.route('/').post(Protect, addOrderItems)
router.route('/myorders').get(Protect, getOrders)
router.route('/:id').get(Protect, getOrderById)
router.route('/:id/pay').put(Protect, updateOrderToPaid)

export default router
