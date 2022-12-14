"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromDb = exports.updateUserFromDb = exports.createUsertoDb = exports.getUsersFromDb = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
// Get All Users
function getUsersFromDb(req, res) {
    db_config_1.default.query("SELECT * FROM users", (err, result) => {
        console.log(result);
        if (err)
            throw err;
        return res.status(200).send(JSON.stringify(result));
    });
}
exports.getUsersFromDb = getUsersFromDb;
// Create User
function createUsertoDb(req, res) {
    console.log("Files:", req.file.filename);
    let values = [req.body.username, req.body.password];
    console.log(values);
    db_config_1.default.query("INSERT INTO users(username, password) VALUES (?,?)", values, (err, result) => {
        if (err)
            return res.send(`"Error when creating user" , ${err}`);
        return res
            .status(200)
            .render("signup", {
            message: "User created successfully",
            user: values,
        });
    });
}
exports.createUsertoDb = createUsertoDb;
// Update User
function updateUserFromDb(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let id = parseInt(req.params.id);
    db_config_1.default.query("UPDATE users SET username = ?,password =? WHERE id = ?", [username, password, id], (err, result) => {
        if (err)
            return res
                .status(400)
                .send(`"Error when updating data", ${err}`);
        return res
            .status(200)
            .send({ message: "User updated successfully", user: result });
    });
}
exports.updateUserFromDb = updateUserFromDb;
// DeleterUser
function deleteUserFromDb(req, res) {
    let id = req.params.id;
    db_config_1.default.query("DELETE FROM users WHERE id = ?", id, (err, result) => {
        if (err)
            return res.send(`"Error when deleting data", ${err}`);
        return res.status(200).send({ message: "User deleted successfully" });
    });
}
exports.deleteUserFromDb = deleteUserFromDb;
