import { Request, Response } from 'express';
import { UserService } from '../service/UserService';

class UserController {

    async handle(request: Request, response: Response) {
        const { nome, email, admin, senha } = request.body;

        const userService = new UserService();

        const user = await userService.execute({nome, email, admin, senha});

        return response.json(user);
    }

    async listUserSendCompliments(request: Request, response: Response) {
        const { user_id } = request;

        const userService = new UserService();
        const compliments = await userService.listUserSendCompliments(user_id);

        return response.json(compliments);
    }

    async listUserReceiverCompliments(request: Request, response: Response) {
        const { user_id } = request;

        const userService = new UserService();
        const compliments = await userService.listUserReceiverCompliments(user_id);

        return response.json(compliments);
    }

    async listUsers(request: Request, response: Response){
        const userService = new UserService();

        const users = await userService.listUsers();

        return response.json(users);
    }

}

export { UserController };