const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const fileStore = require("session-file-store")(session);
const path = require("path");

const app = express();

app.use(cookieParser());
app.use(
  session({
    name: "session-id",
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    store: new fileStore(),
  })
);

function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const err = new Error("You are not authenticated");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;

    next(err);

    const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
      .toString()
      .split(":");

    // Reading username and password
    const username = auth[0];
    const password = auth[1];

    if (username == "admin2" && password == "password") {
      req.session.user = "admin2";
      next();
    } else {
      // Retry incase of incorrect credentials
      const err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  } else {
    if (req.session.user === "admin2") {
      next();
    } else {
      const err = new Error("You are not authenticated!");
      res.setHeader("WWW-Authenticate", "Basic");
      err.status = 401;
      return next(err);
    }
  }
}
// Middlewares
app.use(auth);
app.use(express.static(path.join(__dirname, "public")));

// Server setup
app.listen(3000, () => {
  console.log("Server is Starting");
});
