//node
const fs = require("fs");
const path = require("path");

//template
const template = function () {
  const templatePath = path.resolve(__dirname, "message.html");
  const file = fs.readFileSync(templatePath, { encoding: "utf-8" });
  return file;
};

//dynamic content
const record = function (msg) {
  const fmt = `
  <li>Status: ${msg.status} - ${msg.statusCode}</li>
  <li>Message: ${msg.message}</li>
`;
  return fmt;
};

//route Error Handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // res.status(err.statusCode).json({
  //   status: err.status,
  //   statusCode: err.statusCode,
  //   handler: "global error handler",
  //   message: err.message,
  // });

  res.setHeader("Content-Type", "text/html");
  let tmp = template();

  const marker = "<!-- [insert records] -->";
  tmp = tmp.replace(marker, record(err));

  res.status(err.statusCode).send(tmp);
};
