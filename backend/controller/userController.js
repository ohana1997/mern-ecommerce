const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const { getToken } = require("../utils/authToken")
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
      const { _id, name, email, isAdmin } = user
      const token = getToken({ _id })
      console.log("token: ", token)
      res.json({
        _id,
        name,
        email,
        isAdmin,
        token,
      })
    } else {
      throw new Error("Invalid email or password")
    }
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  if (req.user) {
    const { user } = req
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    next(new Error("User not found"))
  }
}

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) {
      res.status(400)
      throw new Error("Invalid data input")
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const exitUser = await userModel.findOne({ email })
    if (exitUser) {
      res.status(401)
      throw new Error("User is existed !")
    }

    const user = await userModel.create({ name, email, password: hashPassword })

    if (user) {
      const { _id, name, email, isAdmin } = user
      const token = await getToken({ _id, isAdmin })
      res.status(201).json({
        _id,
        name,
        email,
        isAdmin,
        token,
      })
    } else {
      res.status(400)
      throw new Error("Invalid user data")
    }
  } catch (error) {
    next(error)
  }
}

const regularUser = async (req, res, next) => {
  const queryCusId = "75d1cd26c4"
  try {
    const cusId = await testModel.find({})
    const data = await cusId
    console.log("data: ", data, cusId)
    res.json({ cusId })
  } catch (error) {
    console.log("error: ", error)
    next(error)
  }
}

module.exports = {
  authUser,
  getProfile,
  registerUser,
  regularUser,
}
