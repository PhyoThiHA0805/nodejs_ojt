"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const passport_1 = __importDefault(require("passport"));
const secure_routes_1 = __importDefault(require("./src/routes/secure.routes"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const express_session_1 = __importDefault(require("express-session"));
const password_reset_route_1 = __importDefault(require("./src/routes/password-reset.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Setting View Engine
app.set('view engine', 'pug');
app.set('views', 'D:/nodejs/nodejs_ojt/Day14/imageUpload/src/views');
// setting middleware
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("apiuploads"));
// setting error path
app.use((err, req, res, next) => {
    err = new Error(`${req.url} not found in this server`);
    err.status = 404;
    next(err);
});
// setting another error program
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});
app.use((0, express_session_1.default)({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
}));
app.use("/", auth_route_1.default);
app.use("/user", user_route_1.default);
app.use("/auth", passport_1.default.authenticate("jwt", { session: false }), secure_routes_1.default);
require("./src/services/auth.service");
app.use("/forget-password", password_reset_route_1.default);
exports.default = app;
