"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/signup.controller");
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "D:/nodejs/nodejs_ojt/Day10/nodejs-frame/uploads" });
const router = (0, express_1.Router)();
router
    .route('/')
    .get(user_controller_1.getUsers);
router.route('/signup')
    .get(signup_controller_1.signup)
    .post(upload.single("image"), user_controller_1.createUser);
router
    .route('/:id')
    .put(user_controller_1.updateUser)
    .delete(user_controller_1.deleteUser);
exports.default = router;
