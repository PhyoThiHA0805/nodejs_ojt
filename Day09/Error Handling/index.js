const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // Create an error and Passing to the next function
  const err = new Error("Something went wrong");
  next(err.message);
});

/*
 * other route handlers and middleware here
 * ....
 */

// An error Handling Middleware
app.use((err, req, res, next) => { // vvvv
  //! Importent callback function should contain (4) paramenter (err, req, res, next)
  res.status(500);
  res.send("Oops, something went wrong.");
});

app.listen(3000, () => console.log("Server running on port 3000"));
