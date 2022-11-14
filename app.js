//main app configuation
const path = require("path");

//express -> configure express app
const express = require("express");
const app = express();
module.exports.app = app;

//envirnoment
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//static files
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

//cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//post json body parser
app.use(express.json());

//parser for html post
app.use(express.urlencoded({ extended: false }));

//login
require("./login/config")(app, "login routes");

//exception handling
require("./func")(app, "exception route");

//error handling
// const AppError = require("./exceptions/App.Error");
// const errorHandler = require("./exceptions/error.ctl");

//error route
// app.all("*", (req, res, next) => {
//   next(new AppError(`can't find ${req.originalUrl}`, 404));
// });

// app.use(errorHandler);
