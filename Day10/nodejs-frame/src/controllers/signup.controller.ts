import { getSignUpTemplate } from "../services/signup.service";

export function signup(req: any, res: any) {
    getSignUpTemplate(req, res);
}