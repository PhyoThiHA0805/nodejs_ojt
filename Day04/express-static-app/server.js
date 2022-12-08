
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static('images'));

app.use('/static', express.static('public'));

app.listen(PORT, () => {
  console.log('Server connected at:',PORT);
});