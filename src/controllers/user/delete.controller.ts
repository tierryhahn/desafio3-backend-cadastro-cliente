import userDeleteService from "../../services/user/delete.service";
import { Request, Response } from "express";

const userDeleteController = async (req: Request, res: Response) => {
    const {id} = req.params

    const deleteUser = userDeleteService(id)

    return res.status(204).json({message: "Successfully deleted user!"})
}

export default userDeleteController