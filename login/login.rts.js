const express = require("express");
const loginController = require("./login.ctl");
// const protect = require("./cookieJwtAuth");

const router = express.Router();
router.use(express.json());

router.route("/").get(loginController.loginForm);
router.route("/login/msg").get(loginController.loggedIn);
router.route("/").post(loginController.loginHandler);
router.route("/api/login").post(loginController.getJwt);
// router.route("/logout").get(loginController.logoutHandler);

router.route("/profile").get(loginController.profile);

module.exports = router;
