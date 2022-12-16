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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/signup", passport_1.default.authenticate("signup", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        message: "Signup sucessful",
        user: req.user,
    });
}));
router.post("/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("login", (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");
                return next(error);
            }
            req.login(user, { session: false }, (error) => __awaiter(void 0, void 0, void 0, function* () {
                if (error)
                    return next(error);
                const body = { _id: user._id, email: user.email };
                const token = jsonwebtoken_1.default.sign({ user: body }, "TOP_SECRET");
                return res.json({ token });
            }));
        }
        catch (error) {
            return next(error);
        }
    }))(req, res, next);
}));
// router.post(
//     "/login",
//     passport.authenticate("login"),
//     async (req: any, res: any, next: any) => {
//         try {
//             req.login(req.user, { session: false }, async (err: any) => {
//                 if (err) return next(err);
//                 const body = { _id: req.user._id, email: req.user.email };
//                 const token = jwt.sign({ user: body }, "TOP_SECRET");
//                 return res.json({ token });
//             });
//         } catch (err) {
//             return next(err);
//         }
//     }
// );
exports.default = router;
