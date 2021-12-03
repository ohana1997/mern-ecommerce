const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const products = require("./data/products")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoutes")
const errorMiddlewares = require("./middlewares/errorHandler")
dotenv.config()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use("/api/products", productRoutes)

app.use(errorMiddlewares.notFound)

app.use(errorMiddlewares.errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} and listening at http://localhost:${PORT}`
  )
})

const connectDb = require("./config/db")
connectDb().catch((error) => console.error(error))
