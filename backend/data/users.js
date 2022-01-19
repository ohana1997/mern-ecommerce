const cryptojs = require("crypto-js")
const bcrypt = require("bcrypt")
const saltRounds = 10

function hashPassword(password) {
  return bcrypt.hashSync(password, saltRounds)
}
const users = [
  {
    name: "ADMIN",
    email: "admin@example.com",
    password: hashPassword("admin@123"),
    isAdmin: true,
  },
  {
    name: "Nam",
    email: "nguyendainam197@gmail.com",
    password: hashPassword("nguyendainam"),
  },
  {
    name: "Nguyen",
    email: "nguyen@example.com",
    password: hashPassword("nguyen@123"),
  },
]

module.exports = users
