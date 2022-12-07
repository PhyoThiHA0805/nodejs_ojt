const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send("Welcome to Node Babel");
  res.end();
});
app.listen(5000, () => {
  console.log(`app is listening to port 5000`);
});
