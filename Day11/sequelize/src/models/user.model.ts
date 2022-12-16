import sequelize from "sequelize";
import db from "../config/db.config";

export const user = db.define(
    "user",
    {
        // id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        profileImage: {type: sequelize.STRING},
        username: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        token: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: true,
    }
);
