import emailUpdateService from "../../services/email/update.service";
import { Request, Response } from "express";

const emailUpdateController = async (req: Request, res: Response) => {
    const {id} = req.user
    const {email} = req.body
    const email_id = req.params.id

    const updateEmail = await emailUpdateService({id, email_id, email})

    return res.status(200).json({message: "Successfully updated!"})
}

export default emailUpdateController