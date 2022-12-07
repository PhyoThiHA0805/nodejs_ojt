const fs = require("fs");

// Asynchronous read
fs.readFile("input.txt", "utf-8", (err, data) => {
  if (err) return console.log("Error: ", err);
  console.log("Data : ", data);
});

// Synchronous read
const data = fs.readFileSync("input.txt");
console.log("Synchronous read: " + data.toString());

console.log("Program Ended");

// Asynchronous - Opening File
console.log("Going to open file!");
fs.open("input.txt", "r", function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("File opened successfully!", fd);
});

//// Get File Information

console.log("Going to get file info!");
fs.stat("input.txt", function (err, stats) {
  if (err) {
    return console.error(err);
  }
  console.log(stats);
  console.log("Got file info successfully!");

  // Check file type
  console.log("isFile ? " + stats.isFile());
  console.log("isDirectory ? " + stats.isDirectory());
});

//// Writing a File
console.log("Going to write into existing file");
fs.writeFile("input.txt", "Simply Easy Learning!", function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Data written successfully!");
  console.log("Let's read newly written data");

  fs.readFile("input.txt", function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("Asynchronous read: " + data.toString());
  });
});

//// Reading a File
var buf = new Buffer.alloc(1024);

console.log("Going to open an existing file");
fs.open("input.txt", "r+", function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("File opened successfully!");
  console.log("Going to read the file");

  fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
    if (err) {
      console.log(err);
    }
    console.log(bytes + " bytes read");

    // Print only read bytes to avoid junk.
    if (bytes > 0) {
      console.log("Buffer : ", buf.slice(0, bytes).toString());
    }
  });

  // Close the opened file.
  fs.close(fd, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File closed successfully.");
  });
});

//// Truncate a File
console.log("Going to open an existing file");
fs.open("input.txt", "r+", function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("File opened successfully!");
  console.log("Going to truncate the file after 10 bytes");

  // Truncate the opened file.
  fs.ftruncate(fd, 10, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File truncated successfully.");
    console.log("Going to read the same file");

    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
      if (err) {
        console.log(err);
      }

      // Print only read bytes to avoid junk.
      if (bytes > 0) {
        console.log(buf.slice(0, bytes).toString());
      }

      // Close the opened file.
      fs.close(fd, function (err) {
        if (err) {
          console.log(err);
        }
        console.log("File closed successfully.");
      });
    });
  });
});

//// Delete a file
// console.log("Going to delete an existing file");
// fs.unlink('input.txt', function(err) {
//    if (err) {
//       return console.error(err);
//    }
//    console.log("File deleted successfully!");
// });

//// Create a Directory
console.log("Going to create directory /tmp/test");
fs.mkdir('./tmp/test',function(err) {
   if (err) {
      return console.error('Error from Create Directory : ',err);
   }
   console.log("Directory created successfully!");
});

//// Read Directory
console.log("Going to read directory /tmp");
fs.readdir("./tmp/",function(err, files) {
   if (err) {
      return console.error(err);
   }
   files.forEach( function (file) {
      console.log( file );
   });
}); 

//// Remove a Directory
console.log("Going to delete directory /tmp/test");
fs.rmdir("./tmp/test",function(err) {
   if (err) {
      return console.error(err);
   }
   console.log("Going to read directory /tmp");
   
   fs.readdir("./tmp/",function(err, files) {
      if (err) {
         return console.error(err);
      }
      files.forEach( function (file) {
         console.log( file );
      });
   });
}); 