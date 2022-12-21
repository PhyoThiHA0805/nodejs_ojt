import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route";
import passport from "passport";
import secureRoute from "./src/routes/secure.routes";
import authRoute from "./src/routes/auth.route";
import session from "express-session";
import forgetPasswordRoute from "./src/routes/password-reset.route";

import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from './swagger.json';

dotenv.config();
const app = express();

// Setting View Engine
app.set("view engine", "pug");
app.set("views", "D:/nodejs/nodejs_ojt/Day14/imageUpload/src/views");

// setting middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("apiuploads"));
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

app.use(
    session({
        secret: "my-secret",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/auth", passport.authenticate("jwt", { session: false }), secureRoute);
require("./src/services/auth.service");
app.use("/forget-password", forgetPasswordRoute);
export default app;
