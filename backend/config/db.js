const mongoose = require("mongoose")
const mongoUri = "mongodb://localhost:27017/mern_shopee"
// const mongoUri = "mongodb://localhost:27017/testdb"

const connectDb = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("MongoDB Connected ", mongoUri)
  } catch (error) {
    console.error(`Error : ${error}`)
  }
}

module.exports = connectDb
