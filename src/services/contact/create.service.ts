import AppDataSource from "../../data-source";
import { Email } from "../../entities/emails.entity";
import { Phone } from "../../entities/phones.entity";
import { User } from "../../entities/users.entity";
import { Contact } from "../../entities/contacts.entity";
import { AppError } from "../../errors/appError";
import { IContactRequest } from "../../interfaces/contacts";

const contactCreateService = async ({name,emails, phones, id}:IContactRequest) => {
    const emailRepository = AppDataSource.getRepository(Email)
    const phoneRepository = AppDataSource.getRepository(Phone)
    const userRepository = AppDataSource.getRepository(User)
    const contactRepository = AppDataSource.getRepository(Contact)

    const user = await userRepository.findOne({
        where: {
            id: id,
        },
    });

    if(!user){
        throw new AppError("User not found!", 404);
    };

    const contactNew = new Contact()
    contactNew.name = name
    contactNew.user = user!

    contactRepository.create(contactNew)
    await contactRepository.save(contactNew)
    await Promise.all(
        phones.map(async (phone) =>{
            const phoneNew = new Phone();
            phoneNew.phone = phone;
            phoneNew.contacts = contactNew;

            phoneRepository.create(phoneNew);
            await phoneRepository.save(phoneNew);
        })
    )

    await Promise.all(
        emails.map(async (email) => {
            const emailNew = new Email();
            emailNew.email = email
            emailNew.contacts = contactNew

            emailRepository.create(emailNew)
            await emailRepository.save(emailNew)
        })
    )

    return contactNew;
}

export default contactCreateService