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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByUsername = exports.getUsers = void 0;
const sequelize_1 = require("sequelize");
const index_model_1 = __importDefault(require("../models/index.model"));
// Get All users
function getUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield index_model_1.default.user.findAll();
            if (userData.length > 0) {
                res.status(200).json({
                    message: "Connection successful",
                    data: userData,
                });
            }
            else {
                res.status(200).json({
                    message: "Connection failed",
                    data: [],
                });
            }
        }
        catch (error) {
            res.status(404).json({ message: error });
        }
    });
}
exports.getUsers = getUsers;
// Get User by Username
function getUserByUsername(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = yield index_model_1.default.user.findAll({
                where: { username: { [sequelize_1.Op.like]: `%${req.params.username}%` } },
            });
            if (userData.length > 0) {
                res.status(200).json({
                    message: "Connection successful",
                    data: userData,
                });
            }
            else {
                res.status(200).json({
                    message: "Connection failed",
                    data: [],
                });
            }
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    });
}
exports.getUserByUsername = getUserByUsername;
// Create new User
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkData = yield index_model_1.default.user.findAll({
                where: {
                    [sequelize_1.Op.or]: {
                        username: req.body.username,
                        password: req.body.password,
                    },
                },
            });
            if (checkData.length > 0) {
                res.status(500).json({
                    message: "username/password has already in use",
                });
            }
            else {
                index_model_1.default.user
                    .create({
                    profileImage: req.file.filename,
                    username: req.body.username,
                    password: req.body.password,
                    token: req.body.username + req.body.password,
                })
                    .then((result) => {
                    res.status(201).json({
                        message: "user successful created",
                        data: {
                            username: req.body.username,
                            // password: req.body.password,
                            token: req.body.username + req.body.password,
                        },
                    });
                });
            }
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    });
}
exports.createUser = createUser;
// Update existing User
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            index_model_1.default.user
                .findAll({
                where: { user_id: req.body.user_id },
            })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result.length > 0) {
                    const existingUser = yield index_model_1.default.user.findOne({
                        where: { username: req.body.username },
                    });
                    if (!existingUser) {
                        yield index_model_1.default.user.update({
                            username: req.body.username,
                            password: req.body.password,
                            token: req.body.username + req.body.password,
                        }, {
                            where: { user_id: req.body.user_id },
                        });
                        res.status(200).json({
                            message: "update successful",
                            data: {
                                user_id: req.body.user_id,
                                username: req.body.username,
                                password: req.body.password,
                                token: req.body.username + req.body.password,
                            },
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "username is already exist",
                        });
                    }
                }
                else {
                    res.status(500).json({ message: "update failed" });
                }
            }));
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    });
}
exports.updateUser = updateUser;
// delete User
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            index_model_1.default.user
                .findAll({
                where: { user_id: req.body.user_id },
            })
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                if (result.length > 0) {
                    yield index_model_1.default.user.destroy({
                        where: { user_id: req.body.user_id },
                    });
                    res.status(200).json({
                        message: "delete user successfully",
                    });
                }
                else {
                    res.status(404).json({ message: "id user not found" });
                }
            }));
        }
        catch (err) {
            res.status(404).json({ message: err });
        }
    });
}
exports.deleteUser = deleteUser;
