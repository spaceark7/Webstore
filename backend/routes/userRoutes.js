import express from 'express'
import { authUser } from '../controller/userController.js'

const router = express.Router()

// @desc   fetch all product
// @route  GET / api/products
// @access public

router.post('/login', authUser)

export default router
