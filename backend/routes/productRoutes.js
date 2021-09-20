import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../contollers/productController.js'
// @des fetch all product
// @route GET /api/products
// @access public
router.route('/').get(getProducts).post(protect, admin, createProduct)
// @des fetch  product
// @route GET /api/products/:id
// @access public
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
export default router
