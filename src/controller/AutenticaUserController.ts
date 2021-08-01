import { Request, Response } from 'express';
import { AutenticaUserService } from '../service/AutenticaUserService';

class AutenticaUserController {

    async handle(request: Request, response: Response) {
        const { email, senha } = request.body;

        const autenticaUserService = new AutenticaUserService();

        const token = await autenticaUserService.execute({
            email,
            senha
        });

        return response.json(token);
    }
}

export { AutenticaUserController };