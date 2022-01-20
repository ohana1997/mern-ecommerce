const express = require("express")
const router = express.Router()
const {
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  createProduct,
} = require("../controller/productController")
const { authHandler, isAdmin } = require("../middlewares/authHandler")
router.get("/", getProducts)

router.get("/:id", getProductById)
router.delete("/:id", authHandler, isAdmin, deleteProduct)
router.put("/:id", authHandler, isAdmin, updateProduct)
router.post("", authHandler, isAdmin, createProduct)

module.exports = router
