const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.static("public"));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: '/tmp/' }).single(''));

app.get("/api", (req, res) => {
  res.send("Hello, Welcome to my Website");
});

app.get("/", (req, res) => {
  console.log("Got a GET request for the homepage");
  res.send("Hello GET");
});

app.post("/", (req, res) => {
  console.log("Got a POST request for the homepage");
  console.log(req.body);
  res.send(req.body);
});

app.delete("/del_user", (req, res) => {
  console.log("Got a DELETE request for /del_user");
  res.send("Hello DELETE");
});

app.post("/list_user", (req, res) => {
  console.log("Got a GET request for /list_user");
  res.send("Page Listing");
});

app.get("/ab*cd", (req, res) => {
  console.log("Got a GET request for /ab*cd");
  res.send("Page Pattern Match");
});

//// For Form
app.get("/index2.html", (req, res) => {
  res.sendFile(__dirname + "/" + "index2.html");
  console.log(__dirname);
  // const file = (req.url).substring(1);
  // console.log("File", file);
  // fs.readFile(file, "utf8", (err, data) => {
  //     if (err) return console.log('Error: ', err);

  //     res.send(data);

  // })
});

app.get("/process_get", (req, res) => {

  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.send(JSON.stringify(response));
});

app.post("/process_post",urlencodedParser, (req, res) => {
  // Prepare output in JSON format
  const response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

// Wild Card
app.get("**", (req, res) => {
  res.status(404).send("Sorry, cant find that");
});

const server = app.listen(8081, "localhost", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("address ->", host);
  console.log("Example app listening at http://%s:%s", host, port);
});
