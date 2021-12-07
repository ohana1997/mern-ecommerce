const express = require("express")
const router = express.Router()
const productModel = require("../models/productModel")
const asyncHandler = require("express-async-handler")
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allProducts = await productModel.find()
    res.json(allProducts)
  })
)

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const params = req.params.id
    const product = await productModel.findById(params)
    if (product) {
      res.json(product)
    } else {
      res.status(404)
      throw new Error("Product not found !")
    }
  })
)

module.exports = router
