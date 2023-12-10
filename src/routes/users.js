const express = require('express')
const router = express.Router()
const {register,login,profile,refreshToken} = require('../controller/users')
const {protect} = require('../middlewares/auth')


router
.post('/register',register)
.post('/login',login)
.post('/refersh-token',refreshToken)
.get('/profile',protect,profile)


module.exports = router