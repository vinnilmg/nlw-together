import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repository/UsersRepository";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


interface IAuthenticateRequest {
    email: string;
    senha: string;
}


class AutenticaUserService {

    async execute({ email, senha } : IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne({
            email
        });

        if(!user) {
            throw new Error('Email/Senha incorretos.')
        }

        const senhasMatch = await compare(senha, user.senha);

        if(!senhasMatch){
            throw new Error('Email/Senha incorretos.')
        }
        
        //gera o token
        const token = sign(
            { email: user.email },
            'secret-key-teste',
            {
            subject: user.id,
            expiresIn: '1d'
            }
        );

        return token;
    }

}

export { AutenticaUserService };