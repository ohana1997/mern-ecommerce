const notFound = (req, res, next) => {
  console.log("notFound!")
  const err = new Error("Not found API !")
  res.jsonError({
    code: 404,
    message: "Page Not Found",
  })
  next(err)
}

const errorHandler = (err, req, res, next) => {
  console.log("error handler catched !")
  res.status(404).json({
    status: res.statusCode || 500,
    message: "Something went wrong",
    error_msg: err.message,
    stack: process.env.NODE_ENV === "DEVELOPMENT" && err.stack,
  })
}

module.exports = { notFound, errorHandler }
