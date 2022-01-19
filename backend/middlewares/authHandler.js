const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const authHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.status(401)
      throw new Error("Not authorized, token failed")
    }
    const token = authHeader.split(" ")[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = await userModel.findById(decodedToken._id).select("-password")
    next()
  } catch (error) {
    res.status(403)
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  }
  res.status(403)
  throw new Error("You have not permission!")
}

module.exports = { authHandler, isAdmin }
