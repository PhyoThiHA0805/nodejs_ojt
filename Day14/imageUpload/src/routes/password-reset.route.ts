import Joi from "joi";
import express from "express";
import model from "../models/index.model";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.utils";

const router = express.Router();

router.get("/", async (req: any, res: any) => {
    res.render("forget-password");
});

router.post("/", async (req: any, res: any) => {
    console.log("request", req.body);
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).render("forget-password", {
                message: error.details[0].message,
                success: false,
            });

        const user = await model.user.findOne({
            where: { email: req.body.email },
        });
        if (!user)
            return res.status(400).render("forget-password", {
                message: "user with given email doesn't exist",
                success: false,
            });

        let token = await model.token.findOne({
            where: { user_id: user.user_id },
        });
        if (!token) {
            token = await model.token.create({
                user_id: user.user_id,
                token: crypto.randomBytes(32).toString("hex"),
            });
        }

        let link = `${process.env.BASE_URL}/forget-password/${user.user_id}/${token.dataValues.token}`;
        await sendEmail(user.email, "Password reset", link);

        res.render("forget-password", {
            message: "password reset link sent to your email account",
            success: true,
        });
    } catch (error) {
        res.render("forget-password", {
            message: "An error occured",
            success: false,
        });
        console.log(error);
    }
});

router.get("/:user_id/:token", async (req: any, res: any) => {
    let url = "http://localhost:3000/" + req.params.user_id + "/" + req.params.token;
    res.render("password-reset", {
        url: url
    });
});

router.post("/:user_id/:token", async (req: any, res: any) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error)
            return res
                .status(400)
                .render("password-reset", {
                    message: error.details[0].message,
                    success: false,
                });

        const user = await model.user.findOne({
            where: { user_id: req.params.user_id },
        });
        console.log("User:", user);
        if (!user)
            return res
                .status(400)
                .render("password-reset", {
                    message: "invalid link or expired",
                    success: false,
                });

        const token = await model.token.findOne({
            where: {
                user_id: user.user_id,
                token: req.params.token,
            },
        });
        if (!token)
            return res
                .status(400)
                .render("password-reset", {
                    message: "Invalid link or expired",
                    success: false,
                });

        await model.user.update(
            { password: req.body.password },
            { where: { user_id: req.params.user_id } }
        );
        console.log("New Password: ", user.password);
        await token.destroy();
        res.status(200).render("password-reset", {
            message: "Password reset successfully",
            success: true,
        });
    } catch (error: any) {
        console.log(error);
        res.status(400).render("password-reset", {
            message: error.message,
            success: true,
        });
    }
});

export default router;
