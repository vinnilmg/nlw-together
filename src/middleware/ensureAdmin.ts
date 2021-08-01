import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repository/UsersRepository';

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

    const { user_id } = request;
    //console.log(user_id);

    const usersRepository = getCustomRepository(UsersRepository);
    
    const { admin } = await usersRepository.findOne(user_id);
    //console.log(admin);

    //Verifica se o usuário é admin
    if(admin) {
        return next(); // se for admin, continua o fluxo
    }

    return response.status(401).json({
        error: "Sem autorização."
    })
}