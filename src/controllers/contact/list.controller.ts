import contactListService from "../../services/contact/list.service";
import { Request, Response } from "express";

const contactListController = async (req: Request, res: Response) => {
    const {id} = req.params

    const listContact = await contactListService(id)

    return res.status(200).json(listContact)
}

export default contactListController