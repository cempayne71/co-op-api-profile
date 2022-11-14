//co-op api
//configure express app

//node
const path = require("path");

//express app
const express = require("express");
const app = express();
module.exports = app;

//environment
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//static files
const publicPath = path.resolve(__dirname, "public");
// const publicDataPath = path.resolve(__dirname, "public", "data");

app.use(express.static(publicPath));

//helmet Http header security
const helmet = require("helmet");
app.use(helmet({ contentSecurityPolicy: false }));

//xxs security
// const xss = require("xss-clean");
// app.use(xss());

//paramater security
// const hpp = require("hpp");
// app.use(hpp());

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
