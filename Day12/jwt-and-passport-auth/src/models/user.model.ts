import sequelize, { DataTypes, Model } from "sequelize";
import db from "../config/db.config";
import bcrypt from "bcrypt";

export const User = db.define(
    "user",
    {
        // id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        user_id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true,
        },
        profileImage: { type: sequelize.STRING },
        username: { type: sequelize.STRING },
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

User.prototype.verifyPassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

User.prototype.isValidPassword = async function(password: string) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
  }