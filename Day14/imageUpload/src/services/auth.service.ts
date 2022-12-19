import passport from "passport";
import passportJWT from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";
import { User } from "../models/user.model";
import { verifyPassword } from "../utils/verify-password.utils";

const userModel = User;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    "signup",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username: any, password: any, done: any) => {
            try {
                const user = await userModel.create({ username, password });

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    "login",
    new localStrategy(
        {
            usernameField: "username",
            passwordField: "password",
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ where: { username } });

                if (!user) {
                    return done(null, false, { message: "User not Found" });
                }

                const validate = await user.isValidPassword(password);
                if (!validate) {
                    return done(null, false, { message: "Incorrect Password" });
                }

                return done(null, user, { message: "Logged in Successfully" });
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "TOP_SECRET"
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (err) {
                done(err);
            }
        }
    )
);
