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

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await productModel.findById(productId)
    if (product) {
      await product.remove()
      res.json({ message: "Product deleted" })
    }
  } catch (error) {
    next(new Error("Not found Product"))
  }
}
const updateProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, brand, category, countInStock } =
      req.body

    const product = await productModel.findById(req.params.id)
    if (product) {
      console.log("countInStock ", countInStock, product.countInstock)
      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInstock = parseInt(countInStock)

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    }
  } catch (error) {
    next(new Error("Not found Product"))
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = new productModel({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    next(new Error("Something went wrong"))
  }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
}
