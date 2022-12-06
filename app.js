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

// Callback Concepts

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

// Event Loop
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
