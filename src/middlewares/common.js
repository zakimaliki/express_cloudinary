const validate = (req, res, next) => {
  const { name, stock, price } = req.body
  try {
    if (name === '' || stock === '' || price === '') throw new Error('kosong')
    if (isNaN(stock) || isNaN(price)) throw new Error('input bukan angka')
    if (!isNaN(name)) throw new Error('input bukan text')
  } catch (error) {
    res.send(`${error}`)
  }
  next()
}

const myCors = (req,res,next)=>{
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  response.setHeader('Access-Control-Headers', 'Content-Type');
}

module.exports = {validate,myCors}
