import phoneCreateService from "../../services/phone/create.service";
import { Request, Response } from "express";

const phoneCreateController = async (req: Request, res: Response) => {
    const {id} = req.user
    const {phones} = req.body
    const {owner_id} = req.params

    const createPhone = await phoneCreateService({id, phones, owner_id})

    return res.status(201).json(createPhone)
}

export default phoneCreateController