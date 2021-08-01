import { Request, Response } from 'express';
import { ComplimentService } from '../service/ComplimentService';

class ComplimentController {

    async handle(request: Request, response: Response) {
        const { tag_id, user_receiver, mensagem } = request.body;
        const { user_id } = request;

        const complimentService = new ComplimentService();

        const compliment = await complimentService.execute({
            tag_id, 
            user_sender: user_id, 
            user_receiver, 
            mensagem
        });

        return response.json(compliment);

    }     

}

export { ComplimentController }; 