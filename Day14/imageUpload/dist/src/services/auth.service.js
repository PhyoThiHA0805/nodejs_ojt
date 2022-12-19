"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = require("passport-local");
const user_model_1 = require("../models/user.model");
const userModel = user_model_1.User;
const JWTStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
passport_1.default.use("signup", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.create({ username, password });
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.use("login", new passport_local_1.Strategy({
    usernameField: "username",
    passwordField: "password",
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel.findOne({ where: { username } });
        if (!user) {
            return done(null, false, { message: "User not Found" });
        }
        const validate = yield user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, user, { message: "Logged in Successfully" });
    }
    catch (err) {
        return done(err);
    }
})));
passport_1.default.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "TOP_SECRET"
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (err) {
        done(err);
    }
})));
