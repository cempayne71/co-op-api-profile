const app = require("./app.lts");

//mongoose setup
// const mongoose = require("mongoose");
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
// mongoose.connect(DB);

//port
const port = process.env.PORT || 6500;

//server
const server = app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

//unhandeled rejection
process.on("unhandledRejection", (err) => {
  console.log("undhandled rejection");
  console.log(err.nname, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//heroku SIGTERM signal - shutdown and restart app gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED");
  server.close(() => {
    console.log("prcess exit");
  });
});
