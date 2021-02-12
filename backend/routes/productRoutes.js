import express from 'express'
import {
  getProductById,
  getProducts,
} from '../controller/productsController.js'

const router = express.Router()

// @desc   fetch all product
// @route  GET / api/products
// @access public

router.route('/').get(getProducts)

// @desc   fetch all product
// @route  GET / api/products/:id
// @access public

router.route('/:id').get(getProductById)

export default router
