import userListService from "../../services/user/list.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const userListController = async (req: Request, res: Response) => {
    const {id} = req.params

    const listUser = await userListService(id)

    return res.status(204).json(instanceToPlain(listUser))
}

export default userListController