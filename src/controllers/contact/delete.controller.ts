import contactDeleteService from "../../services/contact/delete.service";
import { Request, Response } from "express";

const contactDeleteController = async (req: Request, res: Response) => {
    const {contact_id} = req.params;
    const {id} = req.user

    const deleteContact = await contactDeleteService(id, contact_id)

    return res.status(204).json({message: "Successfully deleted contact!"})
}

export default contactDeleteController