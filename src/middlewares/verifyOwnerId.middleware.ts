import { Request, Response, NextFunction } from 'express' 
import { AppError } from '../errors/appError';

const verifyOwnerIdMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {id} = req.params;
    const compareId = req.user.id;

    if (id !== compareId){
        throw new AppError("Unauthorized, 401");
    } else {
        next();
    }
};

export default verifyOwnerIdMiddleware