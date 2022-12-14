import {
    createUsertoDb,
    deleteUserFromDb,
    getUsersFromDb,
    updateUserFromDb,
} from "../services/user.service";

import FormData from "form-data";

export function getUsers(req: any, res: any) {
    console.log("In User controller");
    getUsersFromDb(req, res);
}

export function createUser(req: any, res: any) {
    console.log(req, "rrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    // console.log(req.body.username, "username ..............");
    // console.log(req.body.password, "password ..............");
    // const formData = new FormData();
    // formData.append("username", req.body.username);
    // formData.append("password", req.body.password);
    // formData.append("image", req.file);
    console.log(req, "fffff");
    createUsertoDb(req, res);
}

export function updateUser(req: any, res: any) {
    updateUserFromDb(req, res);
}

export function deleteUser(req: any, res: any) {
    deleteUserFromDb(req, res);
}
