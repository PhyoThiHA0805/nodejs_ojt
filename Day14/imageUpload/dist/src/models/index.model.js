"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const token_model_1 = require("./token.model");
const user_model_1 = require("./user.model");
const model = {
    user: user_model_1.User,
    token: token_model_1.Token
};
exports.default = model;
