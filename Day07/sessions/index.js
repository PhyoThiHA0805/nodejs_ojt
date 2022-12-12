const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(session({ secret: "your-secret-key" }));

app.get("/", function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

app.listen(3000, () => {
  console.log("Server is Listening on port 3000");
});
