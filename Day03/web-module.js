const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    console.log("Request for " + pathname + " received.");

    fs.readFile(pathname.substring(1), (err, data) => {
      // substring(1) = /index.html --> index.html
      console.log("Substring", pathname.substring(1));
      if (err) {
        console.log(err);

        // Responsing 404 error
        res.writeHead(404, { "Content-Type": "text/html" });
      } else {
        // Responsing 200 OK
        res.writeHead(200, { "Content-Type": "text/html" });

        //   Writing response
        res.write(data);
      }
      res.end();
    });
  })
  .listen(3000);
console.log("Listening on http://localhost:3000");
