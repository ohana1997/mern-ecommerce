const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const { getToken } = require("../utils/authToken")
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email: email })
    if (user && bcrypt.compareSync(password, user.password)) {
      const { _id, name, email, isAdmin } = user
      const token = await getToken({ _id, isAdmin })
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

const updateProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = await bcrypt.hash(password, 10)
    }
    const updatedUser = await user.save()
    const token = await getToken({
      _id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
    })
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
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

const getListUsers = async (req, res, next) => {
  try {
    const allUsers = await userModel.find({})
    res.json({ users: allUsers })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userModel.findById({ _id: userId })
    if (user) {
      await user.remove()
      res.json({ message: "User deleted" })
    }
  } catch (error) {
    next(error)
  }
}

const getUserById = async (req, res, next) => {
  const user = await userModel.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
}
const updateUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id)

  if (user) {
    console.log("user: ", user)
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
}

module.exports = {
  authUser,
  getProfile,
  registerUser,
  updateProfile,
  getListUsers,
  deleteUser,
  getUserById,
  updateUser,
}
