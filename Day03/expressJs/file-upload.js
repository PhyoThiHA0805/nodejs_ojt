const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const upload = multer({ dest: "/tmp/" }).array("file");

app.get("/file-upload.html", (req, res) => {
  const file = __dirname + "/" + "file-upload.html";

  res.sendFile(file);
});

app.post("/file_upload", upload, (req, res) => {
  console.log("Files", req.files);
  req.files.map((file) => {
    // file.path = file.path.replace("\\", "/");
    console.log(file.filename);
    console.log("File Path: ", file.path);
    console.log(file.mimetype);

    const fileLocation = __dirname + "/images/" + file.filename;
    console.log("FileLocation: " + fileLocation);
    fs.readFile(file.path, (err, data) => {
      //   console.log("File Data: " + JSON.stringify(data));

      if (!fs.existsSync("./images/")) {
        fs.mkdir("./images", (err) => {
          if (err) return console.log("Error when creating folder", err);

          console.log("Folder create successfully");
        });
      }
      fs.writeFile(fileLocation, data, (err) => {
        if (err) return console.log(err);

        response = {
          message: "File uploaded successfully",
          filename: file.filename,
        };

        console.log(response);
        res.end(JSON.stringify(response));
      });
    });
  });
});

// Cookies
app.get('/', (req, res)=> {
  console.log("Cookies : ", req.cookies);
  res.send(req.cookies);
})
app.listen(3000, () => console.log("Server is listening on port 3000"));
