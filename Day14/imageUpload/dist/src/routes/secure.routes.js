"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/profile", (req, res, next) => {
    res.json({
        message: "You made it to the secure route",
        user: req.user,
        token: req.query.secret_token,
    });
});
exports.default = router;
