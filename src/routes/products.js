
const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const { getAllProduct, getProduct, insertProduct, updateProduct, deleteProduct } = require('../controller/products')
const { protect } = require('../middlewares/auth')
// const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis')

router
  .get('/', getAllProduct)
  .get('/:id', getProduct)
  // .post('/', upload.single('photo'), insertProduct)
  .post('/', upload, insertProduct)
  // .put('/:id',   upload.single('photo'), updateProduct)
  .delete('/:id', deleteProduct)

module.exports = router
