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

// function auth(req, res, next) {
//   if (!req.session.user) {
//     // Check if the authorization header exists and has the correct format
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Basic ")) {
//       const err = new Error("Missing or invalid authorization header");
//       err.status = 400; // Bad Request
//       return next(err);
//     }

//     // Extract the username and password from the authorization header
//     const auth = new Buffer.from(authHeader.split(" ")[1], "base64")
//       .toString()
//       .split(":");
//     const username = auth[0];
//     const password = auth[1];

//     // Check the username and password against the expected values
//     if (username == "admin2" && password == "password") {
//       req.session.user = "admin2";
//       next();
//     } else {
//       // Send a 401 Unauthorized error if the credentials are incorrect
//       const err = new Error("Incorrect username or password");
//       res.setHeader("WWW-Authenticate", "Basic");
//       err.status = 401;
//       return next(err);
//     }
//   } else {
//     // Check if the user in the session is the expected user
//     if (req.session.user === "admin2") {
//       next();
//     } else {
//       // Send a 403 Forbidden error if the user in the session is not the expected user
//       const err = new Error("You are not authorized to access this resource");
//       err.status = 403;
//       return next(err);
//     }
//   }
// }
// Middlewares
// app.use(auth);

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

    console.log('authHeader :', authHeader);
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
app.use(express.static(path.join(__dirname, "public")));

app.get('/',auth ,(req, res) => {
  res.send('Hello');
})
// Server setup
app.listen(3000, () => {
  console.log("Server is Starting");
});
