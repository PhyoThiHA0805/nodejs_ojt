import { Op } from "sequelize";
import model from "../models/index.model";
import { validate } from "../models/user.model";
import jwt from "jsonwebtoken";
import Joi from "joi";
import _ from "lodash";

// Get All users
export async function getUsers(req: any, res: any) {
    try {
        let userData = await model.user.findAll({
            attributes: {
                exclude: ["password"],
            },
        });

        if (userData.length > 0) {
            userData = userData.map((user) => {
                return user.dataValues;
            });
            console.log("Users: ", userData);

            // res.status(200).render("usersList", {
            //     message: "Connection successful",
            //     data: userData,
            // });
            res.status(200).send(userData);
        } else {
            // res.status(400).render("usersList", {
            //     message: "Connection failed",
            //     data: [],
            // });
            res.status(400).send("Connection failed");
        }
    } catch (error) {
        // res.status(404).render("usersList", { message: error });
        res.status(404).send(error);
    }
}

// Get User by Username
export async function getUserByUsername(req: any, res: any) {
    try {
        const userData = await model.user.findAll({
            where: {
                username: req.params.username,
            },
            attributes: {
                exclude: ["password"],
            },
        });

        if (userData.length > 0) {
            res.status(200).json({
                message: "Connection successful",
                data: userData,
            });
        } else {
            res.status(404).json({
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
    console.log(req.body.username, "bbbbbbbbbbbbbbbbb");
    try {
        const { error } = validate(req.body);
        if (error) {
            // return res.status(400).render("signup", {
            //     message: error.details[0].message,
            //     success: false,
            // });
            return res.status(400).send({
                message: error.details[0].message,
                success: false,
            });
        }

        const checkData = await model.user.findAll({
            where: {
                [Op.or]: {
                    username: req.body.username,
                    email: req.body.email,
                },
            },
        });
        console.log(checkData, "check.......");
        let profileImage;
        if (checkData.length > 0) {
            // res.status(500).render("signup", {
            //     message: "username/email has already in use",
            //     success: false,
            // });

            res.status(500).send({
                message: "username/email has already in use",
                success: false,
            });
        } else {
            let payload = {
                username: req.body.username,
                password: req.body.password,
            };
            model.user
                .create({
                    profileImage: req.file.filename,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    token: jwt.sign(payload, process.env.JWT_SECRET || "", {
                        expiresIn: "1d",
                    }),
                })
                .then((result: any) => {
                    console.log(result, "oooooooooooooooooooo");
                    // res.status(201).render("signup", {
                    //     message: "user successfully created",
                    //     success: true,
                    //     data: {
                    //         username: req.body.username,
                    //         // password: req.body.password,
                    //         token: req.body.username + req.body.password,
                    //     },
                    // });

                    res.status(201).send({
                        message: "user successfully created",
                        success: true,
                        data: _.pick(result, [
                            "user_id",
                            "profileImage",
                            "username",
                            "email",
                        ]),
                    });
                });
        }
    } catch (err: any) {
        // res.status(404).render("signup", { message: err, success: false });
        res.status(404).send({ message: err, success: false });
    }
}

// Update existing User
export async function updateUser(req: any, res: any) {
    try {
        model.user
            .findAll({
                where: { user_id: req.params.user_id },
            })
            .then(async (result: any) => {
                if (result.length > 0) {
                    const schema = Joi.object({
                        username: Joi.string().required(),
                        email: Joi.string().email().required(),
                        password: Joi.string().required(),
                    });
                    const { error } = schema.validate(req.body);

                    if (error)
                        return res.status(400).send({
                            message: error.details[0].message,
                            success: false,
                        });

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
                                where: { user_id: req.params.user_id },
                            }
                        );

                        res.status(200).json({
                            message: "update successful",
                            data: {
                                user_id: req.params.user_id,
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
                    res.status(500).json({
                        message: "Can't find user with given id",
                    });
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
                where: { user_id: req.params.user_id },
            })
            .then(async (result: any) => {
                if (result.length > 0) {
                    await model.user.destroy({
                        where: { user_id: req.params.user_id },
                    });

                    res.status(200).send({
                        message: "delete user successfully",
                    });
                } else {
                    res.status(404).send({
                        message: "User of given id no found",
                    });
                }
            });
    } catch (err) {
        res.status(404).send({ message: err });
    }
}

// Get Signup Form

export function getSignUpForm(req: any, res: any) {
    res.render("signup");
}
