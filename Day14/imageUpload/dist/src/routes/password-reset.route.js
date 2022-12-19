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
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield index_model_1.default.user.findOne({
            where: { email: req.body.email },
        });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");
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
        res.send("password reset link sent to your email account");
    }
    catch (error) {
        res.send("An error occured");
        console.log(error);
    }
}));
router.post("/:user_id/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = joi_1.default.object({ password: joi_1.default.string().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send(error.details[0].message);
        const user = yield index_model_1.default.user.findOne({
            where: { user_id: req.params.user_id },
        });
        console.log("User:", user);
        if (!user)
            return res.status(400).send("invalid link or expired");
        const token = yield index_model_1.default.token.findOne({
            where: {
                user_id: user.user_id,
                token: req.params.token,
            },
        });
        if (!token)
            return res.status(400).send("Invalid link or expired");
        yield index_model_1.default.user.update({ password: req.body.password }, { where: { user_id: req.params.user_id } });
        console.log("New Password: ", user.password);
        yield token.destroy();
        res.status(200).send("Password reset successfully");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(`Error : , ${error}`);
    }
}));
exports.default = router;
