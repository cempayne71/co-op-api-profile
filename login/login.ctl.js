const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userFind = require("./users");
const AppError = require("../exceptions/App.Error");
const update = require("../utilities/template");

//get login form
const loginForm = function (req, res) {
  console.log("get -> login form");
  return res.sendFile(path.join(__dirname, "./login.html"));
};

const loggedIn = function (req, res) {
  const params = req.query;
  console.log(`login event -> user ${params.user} -- admin ${params.admin}`);
  return res.sendFile(path.join(__dirname, "./login_msg.html"));
};

// /api/login
const getJwt = async function (req, res) {
  const { username, password } = req.body;
  const user = userFind(username);
  console.log("user", user);
  if (!user) {
    return next(new AppError(`can't find user with name ${username}`, 400));
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log(`Logged In User ${username}`);
      const token = jwt.sign(
        { id: username, admin: user.admin },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1800s",
        }
      );
      //Secure cookie with httpOnly can't be used by client browser
      res.cookie("token", token, { httpOnly: true });
      console.log(`jwt: ${token}`);

      res.send({ user: username, token: token });
    } else {
      return next(new AppError(`password for ${username} does not match`, 400));
    }
  } catch {
    res.status(500).send();
  }
};

// token secret
const loginHandler = async function (req, res, next) {
  const { username, password } = req.body;
  const user = userFind(username);
  console.log("user", user);
  if (!user) {
    return next(new AppError(`can't find user with name ${username}`, 400));
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      console.log(`Logged In User ${username}`);
      const token = jwt.sign(
        { id: username, admin: user.admin },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "1800s",
        }
      );
      //Secure cookie with httpOnly can't be used by client browser
      res.cookie("token", token, { httpOnly: true });
      console.log(`jwt: ${token}`);
    } else {
      return next(new AppError(`password for ${username} does not match`, 400));
    }
  } catch {
    res.status(500).send();
  }
  res.redirect(`/login/msg/?user=${username}&admin=${user.admin}`);
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login/msg");
};

const profile = (req, res) => {
  const kvp = [
    ["#name#", "Ryan Reynolds"],
    ["#email#", "email"],
    ["#phone#", "phone"],
    ["#role#", "power user"],
    ["#note#", "best customer"],
  ];

  let file = fs.readFileSync(
    path.join(__dirname, "./login_profile.html"),
    "utf-8"
  );

  return res.send(update.pop(kvp, file));
};

exports.loginForm = loginForm;
exports.loggedIn = loggedIn;
exports.loginHandler = loginHandler;
exports.logoutHandler = logout;
exports.getJwt = getJwt;

exports.profile = profile;
