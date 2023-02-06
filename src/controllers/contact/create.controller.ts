import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import contactCreateService from "../../services/contact/create.service";

const contactCreateController = async (req: Request, res: Response) => {
    const {name, phones, emails} = req.body
    const {id} = req.params

    const contactNew = await contactCreateService({name, phones, emails, id})

    return res.status(201).json(instanceToPlain(contactNew));

}

export default contactCreateController