const notFound = (req, res, next) => {
  const err = new Error("Not found API !")
  res.json({
    code: 404,
    message: "Page Not Found",
  })
  next()
}     

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" && err.stack,
  })
}

module.exports = { notFound, errorHandler }
