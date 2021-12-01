const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const products = require("./data/products")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()

app.get("/", (req, res) => {
  res.send("Hello World!")
})
app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id)
  res.json(product)
})

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} and listening at http://localhost:${PORT}`
  )
})

const connectDb = require("./config/db")
connectDb().catch((error) => console.error(error))
console.log(process.argv[1])
