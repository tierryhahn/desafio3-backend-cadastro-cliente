import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { User } from "../../entities/users.entity";
import { IUserUpdate } from "../../interfaces/users";
import bcrypt from "bcrypt"

const userUpdateService = async (id: string, {name,email,password}:IUserUpdate) => {
    const userRepository = AppDataSource.getRepository(User)
    const userFind = await userRepository.findOneBy({
        id
    })

    if (!userFind){
        throw new AppError("User not found!", 404)
    }

    if (email){
        const emailFind = await userRepository.findOneBy({
            email
        })
        if(emailFind){
            throw new AppError("Email already in use!", 400)
        }
    }

    if (password){
        password = bcrypt.hashSync(password,10)
    }

    const userUpdate = {
        name: name || userFind.name,
        email: email || userFind.email,
        password: password || userFind.password,
    }

    await userRepository.update(userFind.id, userUpdate)

    return true
}

export default userUpdateService;