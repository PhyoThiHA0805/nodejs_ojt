const express = require("express");
const route = require("./route");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
// app.use('/route', route);

app.use((req, res, next) => {
  console.log("A new request received at " + Date.now());

  next();
});

//To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));

//To parse json data
app.use(bodyParser.json());

app.use(cookieParser());

app.get("/route", (req, res) => {
  res.send("Things");
});

//First middleware before response is sent
app.use((req, res, next) => {
  console.log("Start");
  next();
});

//Route handler
app.get("/", (req, res, next) => {
  res.send("Middle");
  next();
});

app.use("/", (req, res) => {
  console.log("End");
});

const server = app.listen(3000, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Server listenting at http://%s:%s", host, port);
});
