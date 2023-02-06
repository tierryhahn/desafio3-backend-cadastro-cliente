import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Contact } from "../../entities/contacts.entity";
import { Email } from "../../entities/emails.entity";
import { IEmailRequest } from "../../interfaces/emails";

const emailCreateService = async ({id, contact_id, emails}:IEmailRequest) => {
    const contactRepository = AppDataSource.getRepository(Contact);
    const emailRepository = AppDataSource.getRepository(Email);

    try {
        if (emails.length === 0) {
        throw new AppError("Email registration required!", 400);
    }

    const contact = await contactRepository.findOne({
        relations: { user: true },
        where: {
            id: contact_id,
        },
    });
    if (!contact) {
        throw new AppError("Contact not found!", 404);
    }

    if (contact.user.id !== id) {
        throw new AppError("Unauthorized!", 401);
    }

    let arrEmail: Array<object> = [];
    await Promise.all(
        emails.map(async (email) => {
            const emailNew = new Email();
            emailNew.email = email;
            emailNew.contacts = contact;

            emailRepository.create(emailNew);
    
            arrEmail.push({ email: emailNew.email, message: "created" });
            await emailRepository.save(emailNew);
        })
    );

        return arrEmail;
    } catch (err) {
        if (err instanceof Error) {
            throw new AppError(err.message, 404);
        }
    }
}

export default emailCreateService