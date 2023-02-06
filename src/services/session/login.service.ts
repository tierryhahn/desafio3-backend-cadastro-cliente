import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { compare } from "bcryptjs";
import { User } from "../../entities/users.entity";
import { ISessionLogin } from "../../interfaces/session";

const loginService = async ({email, password}: ISessionLogin) => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const account = users.find((user) => user.email === email)

    if (!account) {
        throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await compare(password, account.password)

    if (!passwordMatch){
        throw new AppError("Invalid email or password", 401)
    }

    const token = jwt.sign({id: account.id}, process.env.SECRET_KEY as string, {
        expiresIn: "24h",
    })

    return {token: token, id: account.id}
}

export default loginService;