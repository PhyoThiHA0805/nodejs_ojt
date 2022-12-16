"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_config_1 = __importDefault(require("../config/db.config"));
exports.user = db_config_1.default.define("user", {
    // id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
        type: sequelize_1.default.UUID,
        defaultValue: sequelize_1.default.UUIDV4,
        primaryKey: true,
    },
    profileImage: { type: sequelize_1.default.STRING },
    username: { type: sequelize_1.default.STRING },
    password: { type: sequelize_1.default.STRING },
    token: { type: sequelize_1.default.STRING },
}, {
    // freeze name table not using *s on name
    freezeTableName: true,
    // dont use createdAt/update
    timestamps: true,
});
