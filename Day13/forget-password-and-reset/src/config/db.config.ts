import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const dbname = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;

const db = new Sequelize(dbname || "", username || "", password, {
    dialect: "mysql",
    host: host,
});

db.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database: ", err);
    });

db.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

export default db;
