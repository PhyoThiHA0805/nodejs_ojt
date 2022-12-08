const express = require("express");

const app = express();

// Setting View Engine
app.set("view engine", "pug");
app.set("views", "./views");

app.get('/', (req, res) => { 
    res.render('menu')
})
const server = app.listen(3000, "localhost", () => {
    const port = server.address().port;
    const host = server.address().address;
  
    console.log("Listening on port http://%s:%s", host, port);
  });