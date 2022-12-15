import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route";

dotenv.config();
const app = express();

// setting middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting error path
app.use((err: any, req: any, res: any, next: any) => {
    err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});

// setting another error program
app.use((err: any, req: any, res: any, next: any) => {
    res.status(err.status || 500).json({ error: err.message });
});

app.use("/user", userRoute);

export default app;
