import { Router } from "express";
import { signup } from "../controllers/signup.controller";
import { createUser, getUsers, updateUser, deleteUser } from "../controllers/user.controller";
import multer from 'multer';

const upload = multer({dest: "D:/nodejs/nodejs_ojt/Day10/nodejs-frame/uploads"})
const router = Router();

router
    .route('/')
    .get(getUsers);

router.route('/signup')
    .get(signup)
    .post(upload.single("image"),createUser);

router
    .route('/:id')
    .put(updateUser)
    .delete(deleteUser);
export default router;
