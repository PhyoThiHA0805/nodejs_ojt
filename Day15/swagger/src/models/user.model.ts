import sequelize, { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import bcrypt from "bcrypt";
import Joi from "joi";

export const User = db.define(
    "user-forget-password",
    {
        // id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        profileImage: { type: sequelize.STRING},
        username: { type: sequelize.STRING },
        email: { type: sequelize.STRING },
        password: { type: sequelize.STRING },
        token: { type: sequelize.STRING },
    },
    {
        // freeze name table not using *s on name
        freezeTableName: true,
        // dont use createdAt/update
        timestamps: true,
        hooks: {
            beforeCreate: async (user: any) => {
                const salt = await bcrypt.genSalt();
                console.log("salt", salt);

                const hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
            },
        },
    }
);

export const validate = (user: any) => {
    const schema = Joi.object({
        profileImage: Joi.string(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        token: Joi.string(),
    });
    return schema.validate(user);
};

// User.prototype.verifyPassword = async function (password: string) {
//     return bcrypt.compare(password, this.password);
// };

User.prototype.isValidPassword = async function (password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};
