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

//// URL Building
app.get("/:id", function (req, res) {
  res.send("The id you specified is " + req.params.id);
});

app.get("/route/:name/:id", function (req, res) {
  res.send("id: " + req.params.id + " and name: " + req.params.name);
});

app.get("/route/:id([0-9]{5})", function (req, res) {
  res.send("id: " + req.params.id);
});

app.get("*", function (req, res) {
  res.send("Sorry, this is an invalid URL.");
});
const server = app.listen(3000, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Server is listening on %s:%s ", host, port);
});
