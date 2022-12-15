"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signup_controller_1 = require("../controllers/signup.controller");
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: "D:/nodejs/nodejs_ojt/Day10/nodejs-frame/uploads/",
    filename: function (req, file, cb) {
        const fileType = file.mimetype.split("/")[1];
        const fileName = file.fieldname + "-" + Date.now() + "." + fileType;
        cb(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage: storage }).single("image");
const router = (0, express_1.Router)();
router.route("/").get(user_controller_1.getUsers);
router.route("/signup").get(signup_controller_1.signup).post(upload, user_controller_1.createUser);
router.route("/:id").put(user_controller_1.updateUser).delete(user_controller_1.deleteUser);
exports.default = router;
