//exception handling module

const AppError = require("./exceptions/App.Error");
const errorHandler = require("./exceptions/error.ctl");

module.exports = function config(app, msg) {
  console.log(`func setup ${msg}`);
  app.all("*", (req, res, next) => {
    next(new AppError(`can't find ${req.originalUrl}`, 404));
  });
  app.use(errorHandler);
};
