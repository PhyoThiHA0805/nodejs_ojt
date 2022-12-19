"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_config_1 = __importDefault(require("../config/db.config"));
exports.Token = db_config_1.default.define("token", {
    user_id: {
        type: sequelize_1.default.STRING,
        // references: "user-forget_password"
    },
    token: {
        type: sequelize_1.default.STRING
    },
    createdAt: {
        type: sequelize_1.default.DATE,
        defaultValue: Date.now
    }
}, {
    freezeTableName: true,
    timestamps: false
});
