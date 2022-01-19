const express = require("express")
const router = express.Router()
const productModel = require("../models/productModel")

const getProducts = async (req, res, next) => {
  try {
    const allProducts = await productModel.find()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
}

const getProductById = async (req, res, next) => {
  try {
    const params = req.params.id
    const product = await productModel.findById(params)
    res.json(product)
  } catch (error) {
    next(new Error("Not found Product"))
  }
}

module.exports = {
  getProducts,
  getProductById,
}
