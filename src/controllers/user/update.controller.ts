import userUpdateService from "../../services/user/update.service";
import { Request, Response } from "express";
import { AppError } from "../../errors/appError";

const userUpdateController = async (req: Request, res: Response) => {
    const {id} = req.params
    const {name,email,password} = req.body

    if (!email && !password && !name) {
        throw new AppError ("No valid data to be changed", 400)
    }

    const updateUser = await userUpdateService(id, {name,email,password})

    return res.status(200).json({message: "Successfully updated!"})
}

export default userUpdateController