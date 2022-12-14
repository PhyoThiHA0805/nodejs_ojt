"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
function getUsers(req, res) {
    console.log("In User controller");
    (0, user_service_1.getUsersFromDb)(req, res);
}
exports.getUsers = getUsers;
function createUser(req, res) {
    console.log(req, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    // console.log(req.body.username, "username ..............");
    // console.log(req.body.password, "password ..............");
    // const formData = new FormData();
    // formData.append("username", req.body.username);
    // formData.append("password", req.body.password);
    // formData.append("image", req.file);
    console.log(req, "fffff");
    (0, user_service_1.createUsertoDb)(req, res);
}
exports.createUser = createUser;
function updateUser(req, res) {
    (0, user_service_1.updateUserFromDb)(req, res);
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    (0, user_service_1.deleteUserFromDb)(req, res);
}
exports.deleteUser = deleteUser;
