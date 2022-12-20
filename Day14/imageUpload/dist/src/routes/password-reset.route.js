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
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const index_model_1 = __importDefault(require("../models/index.model"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_utils_1 = __importDefault(require("../utils/sendEmail.utils"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("forget-password");
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request", req.body);
    try {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).render("forget-password", {
                message: error.details[0].message,
                success: false,
            });
        const user = yield index_model_1.default.user.findOne({
            where: { email: req.body.email },
        });
        if (!user)
            return res.status(400).render("forget-password", {
                message: "user with given email doesn't exist",
                success: false,
            });
        let token = yield index_model_1.default.token.findOne({
            where: { user_id: user.user_id },
        });
        if (!token) {
            token = yield index_model_1.default.token.create({
                user_id: user.user_id,
                token: crypto_1.default.randomBytes(32).toString("hex"),
            });
        }
        let link = `${process.env.BASE_URL}/forget-password/${user.user_id}/${token.dataValues.token}`;
        yield (0, sendEmail_utils_1.default)(user.email, "Password reset", link);
        res.render("forget-password", {
            message: "password reset link sent to your email account",
            success: true,
        });
    }
    catch (error) {
        res.render("forget-password", {
            message: "An error occured",
            success: false,
        });
        console.log(error);
    }
}));
router.get("/:user_id/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = "http://localhost:3000/" + req.params.user_id + "/" + req.params.token;
    res.render("password-reset", {
        url: url
    });
}));
router.post("/:user_id/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({ password: joi_1.default.string().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res
                .status(400)
                .render("password-reset", {
                message: error.details[0].message,
                success: false,
            });
        const user = yield index_model_1.default.user.findOne({
            where: { user_id: req.params.user_id },
        });
        console.log("User:", user);
        if (!user)
            return res
                .status(400)
                .render("password-reset", {
                message: "invalid link or expired",
                success: false,
            });
        const token = yield index_model_1.default.token.findOne({
            where: {
                user_id: user.user_id,
                token: req.params.token,
            },
        });
        if (!token)
            return res
                .status(400)
                .render("password-reset", {
                message: "Invalid link or expired",
                success: false,
            });
        yield index_model_1.default.user.update({ password: req.body.password }, { where: { user_id: req.params.user_id } });
        console.log("New Password: ", user.password);
        yield token.destroy();
        res.status(200).render("password-reset", {
            message: "Password reset successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).render("password-reset", {
            message: error.message,
            success: true,
        });
    }
}));
exports.default = router;
