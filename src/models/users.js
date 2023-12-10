const Pool = require('../config/db')
const findEmail = (email) =>{
  console.log(email);
    return Pool.query(`SELECT * FROM users WHERE email='${email}'`)
}
const create = (data)=>{
const {id,email,passwordHash,fullname,role}= data
console.log(id,email,passwordHash,fullname,role);
    return  new Promise ((resolve,reject)=> 
    Pool.query(`INSERT INTO users(id, email,password,fullname,role) VALUES('${id}','${email}','${passwordHash}','${fullname}','${role}')`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
}

module.exports = {
    findEmail,
    create
}