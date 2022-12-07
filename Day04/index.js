const express = require("express");
const app = express();
const route = require("./route.js");

app.get("/hello", function (req, res) {
  res.send("Hello World!");
});

app.post("/hello", function (req, res) {
  res.send("You just called the post method at '/hello'!\n");
});

app.all("/test", function (req, res) {
  res.send("HTTP method doesn't have any effect on this route!");
});

app.use("/route", route);

const server = app.listen(3000, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Server is listening on %s:%s ", host, port);
});
