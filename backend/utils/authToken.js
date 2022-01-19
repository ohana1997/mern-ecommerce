const jwt = require("jsonwebtoken")

const getToken = (payload = {}) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_TOKEN,
      {
        expiresIn: "10m",
      },
      (error, token) => {
        if (error) reject(error)
        resolve(token)
      }
    )
  })
}

const verifyToken = (payload = {}) => {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, process.env.SECRET_TOKEN, (error, data) => {
      if (error) reject(error)
      resolve(data)
    })
  })
}

module.exports = {
  getToken,
  verifyToken,
}
