import express from "express";
import controller from "../controller/index.controller";
import upload from "../utils/file-upload.utils";

const router = express.Router();

router.get("/", controller.user.getAll);
router.get("/:username", controller.user.getUsername);
router.post("/", upload, controller.user.createNew);
router.put("/", controller.user.editAt);
router.delete("/", controller.user.deleteUser);

export default router;
