import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleWare/errorMiddleware.js'
import connectDB from './config/db.js'
import path from 'path'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

console.log(`${process.env.TOKEN_SECRET}`.red.inverse)

const App = express()
App.get('/', (req, res) => {
  res.send(`<p>Ho ho ho Server is Running ...<p>`)
})
App.use(express.json())
App.use('/api/products', productRoutes)
App.use('/api/users', userRoutes)
App.use('/api/orders', orderRoutes)
App.use('/api/upload', uploadRoutes)
App.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
App.use('/uploads', express.static(path.join(__dirname, '/uploads')))
App.use(notFound)
App.use(errorHandler)

const PORT = process.env.PORT || 5000

App.listen(
  PORT,
  console.log(
    `Server running on ${process.env.NODE_ENV} mode, on the port: ${PORT}`.black
      .bold.bgYellow
  )
)
