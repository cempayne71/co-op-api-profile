const bcrypt = require("bcrypt");

bcrypt.hash("477978", 10).then((hash) => console.log(hash));
