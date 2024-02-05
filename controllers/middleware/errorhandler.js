const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const errorHandler = (error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).json({
    message: message,
    error: "Error message",
    errorStatus: status,
    path: req.path,
  });

  next();
};
module.exports = errorHandler;
