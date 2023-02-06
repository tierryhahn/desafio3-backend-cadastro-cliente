import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { Phone } from "../../entities/phones.entity";
import { Contact } from "../../entities/contacts.entity";
import { IPhonesRequest } from "../../interfaces/phones";
import { User } from "../../entities/users.entity";

const phoneCreateService = async ({id, phones, owner_id}: IPhonesRequest) => {
    const userRepository = AppDataSource.getRepository(User)
    const phoneRepository = AppDataSource.getRepository(Phone)
    const contactRepository = AppDataSource.getRepository(Contact)

    try{
        if (phones.length === 0) {
            throw new AppError("Email registration required!", 400);
        }

        const contactFind = await contactRepository.findOne({
            relations: { user: true },
            where: {
                id: owner_id,
            },
        });

        const user = await userRepository.findOne({
            where: {
                id: owner_id,
            },
        });

        if (!contactFind && !user) {
            throw new AppError("Contact or User not found", 404);
        }
    
        if (contactFind) {
            if (contactFind.user.id !== id) {
                throw new AppError("Unauthorized", 401);
        }
    
            let arrContact: Array<object> = [];
            await Promise.all(
                phones.map(async (phone) => {
                const newPhone = new Phone();
                newPhone.phone = phone;
                newPhone.contacts = contactFind;
    
                phoneRepository.create(newPhone);
    
                arrContact.push({ email: newPhone.phone, message: "created" });
                await phoneRepository.save(newPhone);
                })
            );
    
            return arrContact;
            }
    
        if (user) {
            if (user.id !== id) {
                throw new AppError("Unauthorized", 401);
            }

            let arrUser: Array<object> = [];
            await Promise.all(
                phones.map(async (phone) => {
                const newPhone = new Phone();
                newPhone.phone = phone;
                newPhone.user = user;

                phoneRepository.create(newPhone);

                arrUser.push({ email: newPhone.phone, message: "created" });
                await phoneRepository.save(newPhone);
                })
            );

            return arrUser;
        }
    }catch(err){
        if(err instanceof Error){
            throw new AppError(err.message, 404)
        }
    }
}

export default phoneCreateService