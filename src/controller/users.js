const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const createError = require('http-errors')
const jwt = require('jsonwebtoken')
const { findEmail, create } = require('../models/users')
const commonHelper = require('../helper/common');
const authHelper = require('../helper/auth');
const Joi = require("joi");
const Schema = Joi.object({
  password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
    "pattern.password": "test"
  })
});

const UserController = {
  register: async (req, res, next) => {
    try {
      const { email, password, fullname } = req.body;
      const { error, value } = Schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      console.log(email, password, fullname);
      // const {rowCount} = await findEmail(email)
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password);
      const id = uuidv4()
      // if(rowCount){
      //   return next(createError(403,"Email is already used"))
      // }
      // console.log(rowCount);
      const data = {
        id: uuidv4(),
        email,
        passwordHash,
        fullname,
        role: 'user'
      }
      create(data)
        .then(
          result => commonHelper.response(res, result.rows, 201, "Category created")
        )
        .catch(err => res.send(err)
        )
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body
      const { rows: [user] } = await findEmail(email)
      //   if(!user){
      //     return commonHelper.response(res,null,403,'Email is invalid')
      //   }
      //   const isValidPassword = bcrypt.compareSync(password,user.password)
      //   console.log(isValidPassword);

      //   if(!isValidPassword){
      //     return commonHelper.response(res,null,403,'Password is invalid')
      //   }
      delete user.password
      const payload = {
        email: user.email,
        role: user.role
      }
      user.token = authHelper.generateToken(payload)
      user.refreshToken = authHelper.generateRefershToken(payload)

      commonHelper.response(res, user, 201, 'login is successful')
    } catch (error) {
      console.log(error);
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email
    const { rows: [user] } = await findEmail(email)
    delete user.password
    commonHelper.response(res, user, 200)
  },
  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT)
    const payload = {
      email: decoded.email,
      role: decoded.role
    }
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.generateRefershToken(payload)
    }
    commonHelper.response(res, result, 200)

  }
}


module.exports = UserController 