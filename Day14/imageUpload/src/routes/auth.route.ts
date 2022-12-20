import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// router.post(
//     "/signup",
//     passport.authenticate("signup", { session: false }),
//     async (req: any, res: any, next: any) => {
//         res.json({
//             message: "Signup sucessful",
//             user: req.user,
//         });
//     }
// );

router.post("/login", async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error("An error occurred.");

                return next(error);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, "TOP_SECRET", { expiresIn: "1D"});

                return res.header('x-auth-header', token).json({message: "Login Successful"});
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});


export default router;
