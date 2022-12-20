"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_controller_1 = __importDefault(require("../controller/index.controller"));
const file_upload_utils_1 = __importDefault(require("../utils/file-upload.utils"));
const router = express_1.default.Router();
router.get("/signup", index_controller_1.default.user.getSignUpForm);
router.get("/", index_controller_1.default.user.getAll);
router.get("/:username", index_controller_1.default.user.getUsername);
router.post("/signup", file_upload_utils_1.default, index_controller_1.default.user.createNew);
router.put("/", index_controller_1.default.user.editAt);
router.delete("/", index_controller_1.default.user.deleteUser);
exports.default = router;
