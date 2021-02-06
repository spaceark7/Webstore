import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const App = express();
App.get('/', (req,res) => {
    res.json(`Ho ho ho Server is Running ...`)
})

App.get('/api/products/', (req,res) => {
    res.json(products)
})

App.get('/api/products/:id', (req,res) => {
    const product = products.find(p => p.id === parseInt(req.params.id))
    res.json(product)
})

const PORT = process.env.PORT || 5000

App.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode, on the port: ${PORT}`))