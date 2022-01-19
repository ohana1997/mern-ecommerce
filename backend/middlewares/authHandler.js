const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const authHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    if (!token) {
      res.statusCode(401)
      throw new Error("Not authorized, token failed")
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = await userModel.findById(decodedToken._id).select("-password")
    next()
  } catch (error) {
    res.status(403)
    next(error)
  }
}

module.exports = authHandler
