import phoneDeleteService from "../../services/phone/delete.service";
import { Request,Response } from "express";

const phoneDeleteController = async (req: Request, res: Response) => {
    const {id} = req.user
    const phoneId = req.params.id

    const deletePhone = await phoneDeleteService(id, phoneId)
    
    return res.status(204).json({message: "Successfully deleted phone!"})
}

export default phoneDeleteController