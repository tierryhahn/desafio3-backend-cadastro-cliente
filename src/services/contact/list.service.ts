import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/users.entity";

const contactListService = async (id: string) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: id})

    if (!user){
        throw new AppError("User does not exist!", 404)
    }

    return user.contacts
}

export default contactListService