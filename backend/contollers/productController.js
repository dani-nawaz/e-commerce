import AsyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
export const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})
export const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)

    throw new Error('Product not found.')
  }
})
// @desc Delete a product
// @route Delete /api/products/:id
// @access Private/Admin

export const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    // if(req.user._id===product.user._id){}
    await product.remove()
    res.json({ message: 'Product Removed' })
  } else {
    res.status(404)
    throw new Error('Product not found.')
  }
})
// @desc CREATE a product
// @route Post /api/products
// @access Private/Admin

export const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: 'images/sample.jpg',
    category: 'Sample category',
    brand: 'Sample Brand',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})
// @desc update a product
// @route PUT/api/:id
// @access Private/Admin

export const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body
  const product = await Product.findById(req.params.id)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    const updatedProduct = await product.save()
    console.log(updatedProduct)
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
