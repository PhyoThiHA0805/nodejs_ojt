import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req: any, res: any, next: any) => {
        res.json({
            message: "Signup sucessful",
            user: req.user,
        });
    }
);

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
                const token = jwt.sign({ user: body }, "TOP_SECRET");

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

// router.post(
//     "/login",
//     passport.authenticate("login"),
//     async (req: any, res: any, next: any) => {
//         try {
//             req.login(req.user, { session: false }, async (err: any) => {
//                 if (err) return next(err);

//                 const body = { _id: req.user._id, email: req.user.email };
//                 const token = jwt.sign({ user: body }, "TOP_SECRET");

//                 return res.json({ token });
//             });
//         } catch (err) {
//             return next(err);
//         }
//     }
// );
export default router;
