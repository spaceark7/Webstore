import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controller/userController.js'
import Protect from '../middleWare/userAuthMiddleware.js'
const router = express.Router()

// @desc   fetch all product
// @route  GET / api/products
// @access public
router.route('/').post(registerUser)
router.post('/login', authUser)
router
  .route('/profile')
  .get(Protect, getUserProfile)
  .put(Protect, updateUserProfile)

export default router
