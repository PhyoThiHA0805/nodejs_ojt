import { Op } from "sequelize";
import model from "../models/index.model";

// Get All users
export async function getUsers(req: any, res: any) {
    try {
        const userData = await model.user.findAll();
        if (userData.length > 0) {
            res.status(200).json({
                message: "Connection successful",
                data: userData,
            });
        } else {
            res.status(200).json({
                message: "Connection failed",
                data: [],
            });
        }
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Get User by Username
export async function getUserByUsername(req: any, res: any) {
    try {
        const userData = await model.user.findAll({
            where: { username: { [Op.like]: `%${req.params.username}%` } },
        });

        if (userData.length > 0) {
            res.status(200).json({
                message: "Connection successful",
                data: userData,
            });
        } else {
            res.status(200).json({
                message: "Connection failed",
                data: [],
            });
        }
    } catch (err) {
        res.status(404).json({ message: err });
    }
}

// Create new User
export async function createUser(req: any, res: any) {
    try {
        const checkData = await model.user.findAll({
            where: {
                [Op.or]: {
                    username: req.body.username,
                    password: req.body.password,
                },
            },
        });

        if (checkData.length > 0) {
            res.status(500).json({
                message: "username/password has already in use",
            });
        } else {
            model.user
                .create({
                    profileImage: req.file.filename,
                    username: req.body.username,
                    password: req.body.password,
                    token: req.body.username + req.body.password,
                })
                .then((result:any) => {
                    res.status(201).json({
                        message: "user successful created",
                        data: {
                            username: req.body.username,
                            password: req.body.password,
                            token: req.body.username + req.body.password,
                        },
                    });
                });
        }
    } catch (err) {
        res.status(404).json({ message: err });
    }
}

// Update existing User
export async function updateUser(req: any, res: any) {
    try {
        model.user
            .findAll({
                where: { user_id: req.body.user_id },
            })
            .then(async (result:any) => {
                if (result.length > 0) {
                    const existingUser = await model.user.findOne({
                        where: { username: req.body.username },
                    });

                    if (!existingUser) {
                        await model.user.update(
                            {
                                username: req.body.username,
                                password: req.body.password,
                                token: req.body.username + req.body.password,
                            },
                            {
                                where: { user_id: req.body.user_id },
                            }
                        );

                        res.status(200).json({
                            message: "update successful",
                            data: {
                                user_id: req.body.user_id,
                                username: req.body.username,
                                password: req.body.password,
                                token: req.body.username + req.body.password,
                            },
                        });
                    } else {
                        res.status(400).json({
                            message: "username is already exist",
                        });
                    }
                } else {
                    res.status(500).json({ message: "update failed" });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err });
    }
}

// delete User
export async function deleteUser(req: any, res: any) {
    try {
        model.user
            .findAll({
                where: { user_id: req.body.user_id },
            })
            .then(async (result:any) => {
                if (result.length > 0) {
                    await model.user.destroy({
                        where: { user_id: req.body.user_id },
                    });

                    res.status(200).json({
                        message: "delete user successfully",
                    });
                } else {
                    res.status(404).json({ message: "id user not found" });
                }
            });
    } catch (err) {
        res.status(404).json({ message: err });
    }
}
