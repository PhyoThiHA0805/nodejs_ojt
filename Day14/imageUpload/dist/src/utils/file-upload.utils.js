"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fileStorage = multer_1.default.diskStorage({
    destination: "D:/nodejs/nodejs_ojt/Day14/imageUpload/apiUploads",
    filename: (req, file, callback) => {
        const fileType = file.mimetype.split("/")[1];
        const fileName = file.fieldname + "-" + Date.now() + "." + fileType;
        callback(null, fileName);
    },
});
const upload = (0, multer_1.default)({ storage: fileStorage }).single("fileUpload");
exports.default = upload;
