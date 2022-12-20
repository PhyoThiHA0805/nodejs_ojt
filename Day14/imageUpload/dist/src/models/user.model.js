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
exports.validate = exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_config_1 = __importDefault(require("../config/db.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
exports.User = db_config_1.default.define("user-forget-password", {
    // id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        primaryKey: true,
    },
    profileImage: { type: sequelize_1.default.STRING },
    username: { type: sequelize_1.default.STRING },
    email: { type: sequelize_1.default.STRING },
    password: { type: sequelize_1.default.STRING },
    token: { type: sequelize_1.default.STRING },
}, {
    // freeze name table not using *s on name
    freezeTableName: true,
    // dont use createdAt/update
    timestamps: true,
    hooks: {
        beforeCreate: (user) => __awaiter(void 0, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt();
            console.log("salt", salt);
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
        }),
    },
});
const validate = (user) => {
    const schema = joi_1.default.object({
        profileImage: joi_1.default.string(),
        username: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        token: joi_1.default.string()
    });
    return schema.validate(user);
};
exports.validate = validate;
// User.prototype.verifyPassword = async function (password: string) {
//     return bcrypt.compare(password, this.password);
// };
exports.User.prototype.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const compare = yield bcrypt_1.default.compare(password, user.password);
        return compare;
    });
};
