require('dotenv').config()
const express = require('express')
const createError = require('http-errors')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mainRouter = require('./src/routes/index')
const PORT = process.env.PORT || 5000
const DB_HOST = process.env.DB_HOST

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/api/v1', mainRouter)
app.use('/img', express.static('src/upload'))
app.all('*', (req, res, next) => {
  next(new createError.NotFound())
})
app.use((err,req,res,next)=>{
  const messageError = err.message || "internal server error"
  const statusCode = err.status || 500

  res.status(statusCode).json({
    message : messageError
  })

})
app.listen(8080, () => {
  console.log(`server running on http://localhost:${PORT}`)
})
