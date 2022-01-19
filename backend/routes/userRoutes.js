const express = require("express")
const router = express.Router()
const {
  authUser,
  getProfile,
  registerUser,
} = require("../controller/userController")
const authHandler = require("../middlewares/authHandler")

router.post("/register", registerUser)
router.post("/login", authUser)
router.post("/profile", authHandler, getProfile)

module.exports = router
