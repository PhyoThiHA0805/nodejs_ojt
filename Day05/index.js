const express = require("express");

const app = express();

// Setting View Engine
app.set("view engine", "pug");
app.set("views", "./views");

app.get("/first_template", (req, res) => {
  res.render("first_view");
});

app.get("/dynamic_view", function (req, res) {
  res.render("dynamic", {
    name: "TutorialsPoint",
    url: "http://www.tutorialspoint.com",

    user: { name: "Ayush", age: "20" },
  });
});

app.get("/components", function (req, res) {
  res.render("content");
});

const server = app.listen(3000, "localhost", () => {
  const port = server.address().port;
  const host = server.address().address;

  console.log("Listening on port http://%s:%s", host, port);
});
