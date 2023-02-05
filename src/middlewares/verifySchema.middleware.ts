import { Request, Response, NextFunction } from 'express' 
import { AnySchema } from "yup";

const verifySchemaMiddleware = (schema: AnySchema) => async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const data = req.body;
        const verifyDate = await schema.validate(data);
        req.body = verifyDate;
        next();
    }catch (err) {
        if (err instanceof Error){
            return res.status(400).json({error: err.name, message: err.message})
        }
    }
};

export default verifySchemaMiddleware;
