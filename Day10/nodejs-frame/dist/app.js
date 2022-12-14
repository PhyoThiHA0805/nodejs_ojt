"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const db_config_1 = __importDefault(require("./config/db.config"));
// import multer from 'multer';
// const upload = multer({ dest: "/uploads" }).single('image')
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set("view engine", "pug");
app.set("views", "./src/views");
// app.use(upload);
db_config_1.default.connect((err) => {
    if (err)
        throw err.message;
    console.log("Successfully connected...");
    app.use(express_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use("/users", userRoute_1.default);
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
function v4() {
    throw new Error("Function not implemented.");
}
