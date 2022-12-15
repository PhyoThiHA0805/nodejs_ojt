import { Router } from "express";
import { signup } from "../controllers/signup.controller";
import {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
} from "../controllers/user.controller";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "D:/nodejs/nodejs_ojt/Day10/nodejs-frame/uploads/",
    filename: function (req, file, cb) {
        
        const fileType = file.mimetype.split("/")[1];

        const fileName = file.fieldname + "-" + Date.now() + "." + fileType;

        cb(null, fileName);
    },
});

const upload = multer({ storage: storage }).single("image");
const router = Router();

router.route("/").get(getUsers);

router.route("/signup").get(signup).post(upload, createUser);

router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
