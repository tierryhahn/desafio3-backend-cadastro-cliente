import userCreateService from "../../services/user/create.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const userCreateController = async (req: Request, res: Response) => {
    const {name, email, password, phones} = req.body

    const createUser = await userCreateService({name, email, password, phones})

    return res.status(201).json(instanceToPlain(createUser))
}

export default userCreateController