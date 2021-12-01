const cryptojs = require("crypto-js")
const users = [
  {
    name: "ADMIN",
    email: "admin@example.com",
    password: cryptojs.MD5("admin@123"),
    isAdmin: true,
  },
  {
    name: "Nam",
    email: "Nam@example.com",
    password: cryptojs.MD5("Nam@123"),
  },
  {
    name: "Nguyen",
    email: "nguyen@example.com",
    password: cryptojs.MD5("nguyen@123"),
  },
]

module.exports = users
