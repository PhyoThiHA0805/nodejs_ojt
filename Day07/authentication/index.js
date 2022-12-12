const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const fileStorage = require("session-file-store")(session);
const mysql = require("mysql");

const app = express();
const upload = multer();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PhyoThiHA445442252#mysql",
  database: "mytestdb",
});

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(
  session({
    secret: "Your secret key",
    resave: true,
    saveUninitialized: false,
    store: new fileStorage(),
  })
);

let Users;

con.connect((err) => {
  if (err) throw err;

  console.log("connected...");

  con.query("SELECT * FROM users", (err, result) => {
    if (err) return console.log("Error when getting users" + err);
    Users = result;
    console.log("Users : ", Users);
  });

  app.get("/signup", (req, res) => {
    console.log("Sending Form");
    res.render("signup");
  });

  app.post("/signup", function (req, res) {
    console.log("Users: ", Users);

    if (!req.body.id || !req.body.password) {
      res.status(400);
      res.send("Invalid details!");
    } else {
      // Check if user already exists in the database
      const checkUserQuery = `SELECT * FROM users WHERE id = ${req.body.id}`;
      con.query(checkUserQuery, (err, result) => {
        if (err) return console.log("Error checking if user exists", err), res.send(err.message);

        if (result.length > 0) {
          // User already exists
          res.render("signup", {
            message: "User Already Exists! Login or choose another user id",
          });
        } else {
          // User does not exist, add them to the database
          const newUser = { id: req.body.id, password: req.body.password };
          const addUserQuery = `INSERT INTO users (id, password) VALUES (${req.body.id}, ${req.body.password})`;

          con.query(addUserQuery, (err) => {
            if (err) return console.log("Error when creating new User", err);
            console.log("User created Successfully");
            req.session.user = newUser;
            res.redirect("/protected_page");
          });
        }
      });
    }
  });
});

function checkSignIn(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    const err = new Error("Not Logged in");
    console.log(req.session.user);
    next(err);
  }
}

app.get("/protected_page", checkSignIn, (req, res) => {
  res.render("protected_page", { id: req.session.user.id });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", function (req, res) {
  console.log(Users);
  if (!req.body.id || !req.body.password) {
    res.render("login", { message: "Please enter both id and password" });
  } else {
    const user = Users.find(function (user) {
      return user.id === req.body.id && user.password === req.body.password;
    });

    if (user) {
      req.session.user = user;
      res.redirect("/protected_page");
    } else {
      res.render("login", { message: "Invalid credentials!" });
    }
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("user logged out.");
  });
  res.redirect("/login");
});

app.use("/protected_page", function (err, req, res, next) {
  console.log(err);
  //User should be authenticated! Redirect him to log in.
  res.redirect("/login");
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});
