import express from "express";
import controller from "../controller/index.controller";
import upload from "../utils/file-upload.utils";

const router = express.Router();

router.get("/signup", controller.user.getSignUpForm);
router.get("/", controller.user.getAll);
router.get("/:username", controller.user.getUsername);
router.post("/signup", upload, controller.user.createNew);
router.put("/:user_id", controller.user.editAt);
router.delete("/:user_id", controller.user.deleteUser);

export default router;
