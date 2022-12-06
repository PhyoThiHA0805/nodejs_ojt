var http = require("http");
const express = require("express");

http.createServer( (request, response) => {
  
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
  
    response.end('Hello World\n');
 }).listen(3000);
 
 
 console.log('Server running at http://127.0.0.1:3000/');

 http.createServer((req,res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
 }).listen(4000);
 console.log('Server running on port 4000');


// Callback Concepts

// Synchronous Method
const fs = require("fs");
const data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('Program End');

// Asynchronous Method
fs.readFile('input.txt', (err,data) => {
    if (err) return console.log('Error', err.message);

    console.log('Data: ',data.toString());
})