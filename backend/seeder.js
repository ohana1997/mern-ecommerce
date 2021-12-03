const mongoose = require("mongoose")
const users = require("./data/users")
const products = require("./data/products")
const productModel = require("./models/productModel")
const orderModel = require("./models/orderModel")
const userModel = require("./models/userModel")

// const connectDb = require("./config/db")
// connectDb().catch((error) => console.error(error))

const importData = async () => {
  try {
    await productModel.deleteMany()
    await userModel.deleteMany()
    await orderModel.deleteMany()

    const createUser = await userModel.insertMany(users)
    const adminObjectID = createUser[0]._id
    const productWithObjectID = products.map((product) => {
      return { ...product, user: adminObjectID }
    })
    await productModel.insertMany(productWithObjectID)

    console.log("ImportData success")
    process.exit()
  } catch (error) {
    console.log("Error: ", error)
    process.exit()
  }
}

const clearData = async () => {
  try {
    await productModel.deleteMany()
    await userModel.deleteMany()
    await orderModel.deleteMany()

    console.log("clearData success")
    process.exit()
  } catch (error) {
    console.log("Error: ", error)
    process.exit()
  }
}

const connectDb = require("./config/db")
connectDb().catch((error) => console.error(error))

if (process.argv[2] == "-c") {
  clearData()
} else {
  importData()
}
