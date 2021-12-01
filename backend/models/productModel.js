const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const productSchema = mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User", require: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    review: [reviewSchema],
    numReviews: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInstock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model("Product", productSchema)

module.exports = Product
