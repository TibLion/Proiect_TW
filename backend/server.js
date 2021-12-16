const express = require("express");
const connection = require("./models").connection;
const app = express();

let PORT = 8081;

app.get("/reset", (req, res) => {
  connection
    .sync({ force: true })
    .then(() => {
      res.status(201).send({ message: "Database reset" });
    })
    .catch(() => {
      res.status(500).send({ message: "Database reset failed" });
    });
});

app.use("/*", (res, req) => {
  res.status(200).send({ message: "App is working" });
});

app.listen(PORT, () => {
  console.log("The server work on port " + PORT);
});
