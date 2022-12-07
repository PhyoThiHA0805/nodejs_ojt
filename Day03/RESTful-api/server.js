const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

// Get All users
const file = __dirname + "/" + "users.json";
app.get("/listUsers", (req, res) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return console.log("Error when reading file");

    console.log(data);
    res.end(data);
  });
});

// Add new User
app.post("/addUser", (req, res) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return console.log("Error when reading file");

    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);

    res.end(JSON.stringify(data));

    fs.writeFile(file, JSON.stringify(data), "utf-8", (err) => {
      if (err) return console.log("Error when writing File");

      console.log("UserList file updated ");
    });
  });
});

// Find User
app.get("/user/:id", (req, res) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return console.log("Error when reading file");

    console.log("Param", req.params.id);
    data = JSON.parse(data);
    let user = data["user" + req.params.id];
    console.log("User :", user);
    res.end(JSON.stringify(user));
  });
});

//  Delete User
app.delete("/listUsers/:id", (req, res) => {
  fs.readFile(file, "utf-8", (err, data) => {
    if (err) return console.log("Error when reading file");

    let users = JSON.parse(data);
    delete users["user" + req.params.id];

    // console.log("Deleted User: ", user);
    console.log("Users :", users);
    res.end(JSON.stringify(users));

    fs.writeFile(file, JSON.stringify(users), "utf-8", (err) => {
      if (err) return console.log("Error when writing File");

      console.log("UserList file updated ");
    });
  });
});
app.listen(3000, () => console.log("Listening on port 3000"));
