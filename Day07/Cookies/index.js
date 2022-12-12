const cookieParser = require("cookie-parser");
const express = require("express");

app = express();
app.use(cookieParser());

// Regular Cookie
app.get("/", (req, res) => {
  res.cookie("name", "express").send("cookie set"); //Sets name = express

  console.log("Cookies: ", req.cookies);
});

// Cookie with Expiration Date
app.get("/cookie", (req, res) => {
  const expirationTime = new Date(Date.now() + 60 * 60 * 1000);

  res
    .cookie("name", "new cookie", { expires: expirationTime })
    .send(`new Cookie set ${JSON.stringify(req.cookies)}`);

  console.log("Cookies: ", req.cookies);
});

// Delete Existing Cookie
app.get("/delete-cookie", (req, res) => {
  res.clearCookie("new cookie").send("Cookie new cookie is clear");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
