const express = require('express')
const router = express.Router()
const ProductRouter = require('../routes/products')
const CategoryRouter = require('../routes/category')
const UserRouter = require('../routes/users')


router
.use('/products', ProductRouter)
.use('/category', CategoryRouter)
.use('/users', UserRouter)


module.exports = router