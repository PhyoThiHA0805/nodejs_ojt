import Joi from "joi";
import express from "express";
import model from "../models/index.model";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.utils";

const router = express.Router();

router.post("/", async (req: any, res: any) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await model.user.findOne({
            where: { email: req.body.email },
        });
        if (!user)
            return res.status(400).send("user with given email doesn't exist");

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

        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("An error occured");
        console.log(error);
    }
});

router.post("/:user_id/:token", async (req: any, res: any) => {
    try {
        const schema = Joi.object({ password: Joi.string().required() });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await model.user.findOne({
            where: { user_id: req.params.user_id },
        });
        console.log("User:", user);
        if (!user) return res.status(400).send("invalid link or expired");

        const token = await model.token.findOne({
            where: {
                user_id: user.user_id,
                token: req.params.token,
            },
        });
        if (!token) return res.status(400).send("Invalid link or expired");

        await model.user.update(
            { password: req.body.password },
            { where: { user_id: req.params.user_id } }
        );
        console.log("New Password: ", user.password);
        await token.destroy();
        res.status(200).send("Password reset successfully");
    } catch (error) {
        console.log(error);
        res.status(400).send(`Error : , ${error}`);
    }
});

export default router;
