const fs = require("fs");
const path = require("path");

const userDataPath = path.resolve(__dirname, "./users.json");

const getData = () => {
  try {
    const userData = fs.readFileSync(userDataPath, "utf-8");
    return Object.freeze(JSON.parse(userData));
  } catch (err) {
    console.log(err);
  }
};

const userFind = (username) => {
  return getData().find((user) => user.name === username);
};

module.exports = userFind;
