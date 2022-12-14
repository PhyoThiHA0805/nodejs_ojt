import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import users from "./routes/userRoute";
import connection from "./config/db.config";
// import multer from 'multer';

// const upload = multer({ dest: "/uploads" }).single('image')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "./src/views");

// app.use(upload);

connection.connect((err) => {
    if (err) throw err.message;
    console.log("Successfully connected...");

    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use("/users", users);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
function v4() {
    throw new Error("Function not implemented.");
}
