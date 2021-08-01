import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repository/UsersRepository";
import { hash } from 'bcryptjs';
import { ComplimentsRepository } from "../repository/ComplimentsRepository";
import { classToPlain } from 'class-transformer';


interface IUserRequest {
    nome: string;
    email: string;
    admin?: boolean;
    senha: string;
}

class UserService {

    async execute({nome, email, admin = false, senha } : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        if(!email) {
            throw new Error("Email incorreto!");
        }

        const userExiste = await usersRepository.findOne({
            email,
        });

        if(userExiste) {
            throw new Error("User já existe!");
        }
        //criptografando senha
        const passwHash = await hash(senha, 8)

        const user = usersRepository.create({
            nome,
            email,
            admin,
            senha: passwHash,
        })

        await usersRepository.save(user);

        return user;
    }

    async listUserReceiverCompliments(user_id: string) {

        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }

    async listUserSendCompliments(user_id: string) {

        const complimentsRepository = getCustomRepository(ComplimentsRepository);

        const compliments = await complimentsRepository.find({
            where: {
                user_sender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"]
        });

        return compliments;
    }

    async listUsers() {
        const usersRepository = getCustomRepository(UsersRepository);
        const users = await usersRepository.find();

        return classToPlain(users);
    }
}

export { UserService }