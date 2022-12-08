const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const upload = multer();
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('form');
})

app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', (req, res) => { 
    console.log(req.body);
    res.send("recieved your request!");

    let fileLocation = './public/' + 'req.body.say' + '.txt';
    fs.writeFile(fileLocation, JSON.stringify(req.body), (err) => {
        if (err) return console.log('Error when writing file');

        console.log('Writing Complete...');
    })
})

const server = app.listen(3000, "localhost", () => {
    const port = server.address().port;
    const host = server.address().address;

    console.log('Server is listening to https://%s:%s', host, port);
})