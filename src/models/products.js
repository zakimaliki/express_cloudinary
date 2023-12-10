const Pool = require('../config/db')
const selectAll = ({limit,offset,sort,sortby}) => {
  return Pool.query(`SELECT * FROM products ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM products WHERE id='${id}'`)
}
const insert = (data) => {
  const { id,name,stock,price,photo,description } = data
  return Pool.query(`INSERT INTO products(id,name,stock,price,photo,description) VALUES(${id},'${name}',${stock},${price},'${photo}','${description}')`)
}
const update = (data) => {
  const { id,name,stock,price,photo,description } = data
  return Pool.query(`UPDATE products SET name='${name}', stock=${stock}, price=${price} ,photo='${photo}' ,description='${description}' WHERE id='${id}'`)
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM products WHERE id='${id}'`)
}

const countData = () =>{
  return Pool.query('SELECT COUNT(*) FROM products')
}

const findId =(id)=>{
  return Pool.query(`SELECT id FROM products WHERE id='${id}'`)
}

module.exports = {
  selectAll,
  select,
  insert,
  update,
  deleteData,
  countData,
  findId
}
