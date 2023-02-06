import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { IEmailRequestUpdate } from "../../interfaces/emails";

const emailUpdateService = async ({email, email_id, id}:IEmailRequestUpdate) => {
    const emailRepository = AppDataSource.getRepository(Email)
    const contactRepository = AppDataSource.getRepository(Contact)

    try{
        const emailFind = await emailRepository.findOne({
            relations: { contacts: true },
            where: {
                id: email_id,
            },
        });

        if (!emailFind) {
            throw new AppError("Email not found!", 404);
        }

        const contactFind = await contactRepository.findOne({
            relations: { user: true },
            where: {
                id: emailFind.contacts.id,
            },
        });

        if (!contactFind) {
            throw new AppError("Contact not found!", 404);
        }
    
        if (contactFind.user.id !== id) {
            throw new AppError("Unauthorized!", 401);
        }

        await emailRepository.update(emailFind.id, { email: email });

        return true;

    }catch(err){
        if (err instanceof Error) {
            throw new AppError(err.message,404)
        }
    }
}

export default emailUpdateService