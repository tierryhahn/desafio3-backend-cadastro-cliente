import emailDeleteService from "../../services/email/delete.service";
import { Request, Response } from "express";

const emailDeleteController = async (req: Request, res: Response) => {
    const {id} = req.user
    const email_id = req.params.id

    const deleteEmail = await emailDeleteService(id, email_id)

    return res.status(204).json({message: "Successfully deleted email!"})
}

export default emailDeleteController