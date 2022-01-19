const express = require("express")
const router = express.Router()
const {
  authUser,
  getProfile,
  registerUser,
  getListUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controller/userController")
const { authHandler, isAdmin } = require("../middlewares/authHandler")
router.post("/register", registerUser)
router.post("/login", authUser)
router.post("/:id", authHandler, getProfile)
// admin route
router.get("/listusers", authHandler, isAdmin, getListUsers)
router.delete("/:id", authHandler, isAdmin, deleteUser)
router.get("/:id", authHandler, isAdmin, getUserById)
router.put("/:id", authHandler, isAdmin, updateUser)

module.exports = router
