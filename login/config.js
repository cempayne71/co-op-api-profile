//login setup

const routes = require("./login.rts");

module.exports = function config(app, msg) {
  console.log(`login setup ${msg}`);
  app.use("/", routes);
};
