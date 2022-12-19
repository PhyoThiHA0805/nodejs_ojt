import sequelize from "sequelize";
import db from "../config/db.config";

export const Token = db.define(
    "token",
    {
        user_id: {
            type: sequelize.STRING,
            // references: "user-forget_password"
        },
        token: {
            type: sequelize.STRING
        },
        createdAt: {
            type: sequelize.DATE,
            defaultValue: Date.now
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);
