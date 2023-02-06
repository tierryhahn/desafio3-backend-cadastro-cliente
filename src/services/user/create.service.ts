import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
import { Phone } from "../../entities/phones.entity";
import { hash } from "bcryptjs";

const userCreateService = async ({name, email, password, phones}:IUserRequest) => {
    const userRepository = AppDataSource.getRepository(User)
    const phoneRepository = AppDataSource.getRepository(Phone)

    const userFind = await userRepository.findOneBy({
        email
    })

    if (userFind){
        throw new AppError("Email already exists!", 400)
    }

    if (phones.length === 0){
        throw new AppError("Need to register a phone", 400)
    }

    const hashPassword = await hash(password, 10)

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashPassword

    userRepository.create(user)
    await userRepository.save(user)

    phones.map(async (phone) => {
        const phoneNew = new Phone()
        phoneNew.phone = phone;
        phoneNew.user = user;

        phoneRepository.create(phoneNew)
        await phoneRepository.save(phoneNew)
    })

    return user;
}

export default userCreateService