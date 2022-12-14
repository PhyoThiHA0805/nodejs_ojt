"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const signup_service_1 = require("../services/signup.service");
function signup(req, res) {
    (0, signup_service_1.getSignUpTemplate)(req, res);
}
exports.signup = signup;
