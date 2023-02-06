import loginService from "../../services/session/login.service";
import { Request, Response } from "express";

const loginController = async (req: Request, res: Response) => {
    const {email, password} = req.body

    const login = await loginService({email, password})

    return res.status(200).json(login)
}

export default loginController