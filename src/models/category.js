const Pool = require('../config/db')
const selectAll = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`)
}
const select = (id) => {
  return Pool.query(`SELECT * FROM category WHERE id=${id}`)
}
const insert = (id, name) => {
  return Pool.query(`INSERT INTO category(id,name) VALUES ('${id}','${name}')`)
}
const update = (id, name) => {
  return Pool.query(`UPDATE category SET name='${name}' WHERE id='${id}'`)
}
const deleteData = (id) => {
  return Pool.query(`DELETE FROM category WHERE id=${id}`)
}

const countData = () => {
  return Pool.query('SELECT COUNT(*) FROM category')
}

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM category WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result)
      } else {
        reject(error)
      }
    })
  )
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
