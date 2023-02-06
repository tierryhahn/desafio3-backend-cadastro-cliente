import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contacts.entity";
import { Phone } from "../../entities/phones.entity";
import { IPhonesRequestUpdate } from "../../interfaces/phones";

const phoneUpdateService = async ({phoneId, Newphone, id}:IPhonesRequestUpdate) => {
    const phoneRepository = AppDataSource.getRepository(Phone)
    const contactRepository = AppDataSource.getRepository(Contact)

    try{
        const phoneFind = await phoneRepository.findOne({
            relations: { user: true, contacts: true },
            where: {
                id: phoneId,
            },
        });

        if (!phoneFind) {
            throw new AppError("Phone not found!", 404);
        }

        if (phoneFind.user) {
            if (phoneFind.user.id !== id) {
                throw new AppError("Unauthorized!", 401);
            }

            await phoneRepository.update(phoneFind.id, { phone: Newphone });

            return true;
        }

        if (phoneFind.contacts) {
            const contact = await contactRepository.findOne({
                relations: { user: true },
                where: {
                id: phoneFind.contacts.id,
                },
            });

            if (contact!.user.id !== id) {
                throw new AppError("Unauthorized!", 401);
            }
    
            await phoneRepository.update(phoneFind.id, { phone: Newphone });

            return true;
        }
        
    }catch (err) {
        if (err instanceof Error) {
            throw new AppError(err.message, 404)
        }
    }
}

export default phoneUpdateService