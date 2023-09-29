const { constants } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error(err);

  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({ title: "Not Found", message: err.message, stackTrace: err.stack });
      break;
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
      break;
    default:
      res.status(statusCode).json({ title: "Error", message: err.message, stackTrace: err.stack });
      break;
  }
};

module.exports = errorHandler;
