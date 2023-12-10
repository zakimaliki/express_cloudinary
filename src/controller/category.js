const createError = require('http-errors')
const { select, countData, findId, insert, update, deleteData, selectAll } = require('../models/category')
const commonHelper = require('../helper/common')

const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  })
});

const categoryController = {

  getAllCategory: async (req, res, next) => {
    try {
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || "name"
      const sort = req.query.sort || "ASC"
      const result = await selectAll({ limit, offset, sort, sortby })
      const { rows: [count] } = await countData()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData / limit)
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage
      }
      commonHelper.response(res, result.rows, 200, "get data success", pagination)
    } catch (error) {
      console.log(error);
    }
  },
  getCategory: (req, res, next) => {
    const id = Number(req.params.id)
    select(id)
      .then(
        result => commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch(err => res.send(err)
      )
  },
  insertCategory: async (req, res, next) => {
    const { name } = req.body
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { rows: [count] } = await countData()
    const id = Number(count.count) + 1;
    insert(id, name)
      .then(
        result => commonHelper.response(res, result.rows, 201, "Category created")
      )
      .catch(err => res.send(err)
      )
  },
  updateCategory: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const name = req.body.name
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"))
      }
      update(id, name)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Category updated")
        )
        .catch(err => res.send(err)
        )
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { rowCount } = await findId(id)
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"))
      }
      deleteData(id)
        .then(
          result => commonHelper.response(res, result.rows, 200, "Category deleted")
        )
        .catch(err => res.send(err)
        )
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = categoryController
