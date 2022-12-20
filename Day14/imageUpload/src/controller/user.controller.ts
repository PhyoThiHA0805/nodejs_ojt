import * as userService from "../services/user.service";

const controller = {
    // Get Users
    getAll: async (req: any, res: any) => {
        userService.getUsers(req, res);
    },

    getUsername: async (req: any, res: any) => {
        userService.getUserByUsername(req, res);
    },

    // Create User
    createNew: async (req: any, res: any) => {
        userService.createUser(req, res);
    },

    // Update User
    editAt: async (req: any, res: any) => {
        userService.updateUser(req, res);
    },

    // Delete User
    deleteUser: async (req: any, res: any) => {
        userService.deleteUser(req, res);
    },

    // Get Signup form
    getSignUpForm: (req: any, res: any) => {
        userService.getSignUpForm(req, res);
    }
};

export default controller;
