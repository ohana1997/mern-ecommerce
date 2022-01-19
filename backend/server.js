const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const products = require("./data/products")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const errorMiddlewares = require("./middlewares/errorHandler")
const compression = require("compression")
const connectDb = require("./config/db")
const morgan = require("morgan")
connectDb().catch((error) => console.error(error))
dotenv.config()

//MiddleWare
app.use(morgan("tiny"))
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(compression())

app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes)

app.use(errorMiddlewares.notFound)
app.use(errorMiddlewares.errorHandler)

app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} and listening at http://localhost:${PORT}`
  )
})
