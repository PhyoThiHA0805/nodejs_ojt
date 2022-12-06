var http = require("http");
const express = require("express");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });

    response.end("Hello World\n");
  })
  .listen(3000);

console.log("Server running at http://127.0.0.1:3000/");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      res.write("Hello World");
      res.end();
    }

    if (req.url === "/api/courses") {
      res.write(JSON.stringify([1, 2, 3]));
      res.end();
    }
  })
  .listen(4000);
console.log("Server running on port 4000");

//// Callback Concepts

// Synchronous Method
const fs = require("fs");
const data = fs.readFileSync("input.txt");

console.log(data.toString());
console.log("Program End");

// Asynchronous Method
fs.readFile("input.txt", (err, data) => {
  if (err) return console.log("Error", err.message);

  console.log("Data: ", data.toString());
});

//// Event Loop
const EventEmitter = require("events");
const emitter = new EventEmitter();

// Create an event handler as follows
const eventHandler = function connected() {
  console.log("connection succesful.");

  // Fire the data_received event
  emitter.emit("data_received", { name: "Phyo Thiha" });
};

// Register listeners
emitter.on("connection", eventHandler);

// Bind data_received event
emitter.on("data_received", (data) =>
  console.log("Data is successfully received", data)
);

// Raise an Event
emitter.emit("connection");
console.log("Event is raised");

//// Streams
let data1 = "";

// Create a readable stream
const readerStream = fs.createReadStream("input.txt");

// Set the encoding to be utf8.
readerStream.setEncoding("UTF8");
readerStream.on("data", (chunk) => {
  (data1 += chunk), console.log("Chunks : ", chunk);
});
readerStream.on("end", () => console.log("Data from streams : ", data1));
readerStream.on("error", (err) => console.log(err.stack));

// Create a writable stream
const writerStream = fs.createWriteStream("output.txt");

// Write the data to stream with encoding to be utf8
writerStream.write(data, "UTF8");

// Mark the end of file
writerStream.end(); // When throw error, comment this line

// Handle stream events --> finish, and error
writerStream.on("finish", function () {
  console.log("Write completed.");
});

writerStream.on("error", function (err) {
  console.log(err.stack);
});

//// Piping Stream
readerStream.pipe(writerStream);

//// Chaining Stream
const zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('input.txt')
   .pipe(zlib.createGzip())
   .pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("File Compressed.")

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('input.txt.gz')
   .pipe(zlib.createGunzip())
   .pipe(fs.createWriteStream('input.txt'));
  
console.log("File Decompressed.");