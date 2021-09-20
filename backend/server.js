import express from 'express' //this is common js
// const products = require('./data/products.js')
// import { products } from './data/products.js'
// --unhandled-rejections=strict
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoute from './routes/userRoute.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
dotenv.config()
connectDB()
const app = express()
// app.use((req, res, next) => {
//   console.log(req.originalUrl)
//   next()
// })
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Api is runing.........')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoutes)
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT
app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on the port ${PORT}`.yellow.bold
  )
)
