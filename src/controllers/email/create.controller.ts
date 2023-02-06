import emailCreateService from "../../services/email/create.service";
import { Request, Response } from "express";

const emailCreateController = async (req: Request, res: Response) => {
    const {id} = req.user
    const {emails} = req.body
    const {contact_id} = req.params

    const createEmail = await emailCreateService({id, contact_id, emails})

    return res.status(201).json(createEmail)
}

export default emailCreateController