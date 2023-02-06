import phoneUpdateService from "../../services/phone/update.service";
import { Request, Response } from "express";

const phoneUpdateController = async (req: Request, res: Response) => {
    const {id} = req.user
    const phoneId = req.params.id
    const Newphone = req.body.phone

    const updatePhone = await phoneUpdateService({id, phoneId, Newphone})

    return res.status(200).json({message: "Successfully updated!"})

}

export default phoneUpdateController