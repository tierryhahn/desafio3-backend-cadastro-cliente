import contactUpdateService from "../../services/contact/update.service";
import { Request, Response } from "express";

const contactUpdateController = async (req: Request, res: Response) => {
    const {name} = req.body
    const {contact_id} = req.params
    const {id} = req.user

    const contactUpdate = await contactUpdateService({name, contact_id, id})

    return res.status(200).json({message: "Successfully updated!"})
}

export default contactUpdateController