import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contacts.entity";
import { IContactRequestUpdate } from "../../interfaces/contacts";

const contactUpdateService = async ({id, contact_id, name}: IContactRequestUpdate) => {
    const contactRepository = AppDataSource.getRepository(Contact)

    try{
        const contact = await contactRepository.findOne({
            relations: {user: true},
            where: {
                id: contact_id
            }
        })

        if (!contact){
            throw new AppError("Contact does not exist!", 404)
        }

        if (contact.user.id !== id) {
            throw new AppError("Unauthorized!", 401)
        }

        await contactRepository.update(contact.id, {name: name})

        return true;
    }catch (err) {
        if (err instanceof Error){
            if (err.message === "Unauthorized!"){
                throw new AppError(err.message, 401)
            }
            throw new AppError(err.message, 404)
        }
    }
}

export default contactUpdateService