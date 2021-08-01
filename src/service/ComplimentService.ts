import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repository/ComplimentsRepository";
import { UsersRepository } from "../repository/UsersRepository";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    mensagem: string;
}


class ComplimentService {

    async execute({tag_id, user_sender, user_receiver, mensagem}: IComplimentRequest) {
        const complimentRepository = getCustomRepository(ComplimentsRepository);
        const userRepository = getCustomRepository(UsersRepository);


        if(user_sender === user_receiver) {
            throw new Error('Usuarios iguais');
        }

        const userReceiverExiste = await userRepository.findOne(user_receiver);
        if(!userReceiverExiste) {
            throw new Error('User Receiver não existe!');
        }

        const userSenderExiste = await userRepository.findOne(user_sender);
        if(!userSenderExiste) {
            throw new Error('User Sender não existe!');
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_receiver,
            user_sender,
            mensagem
        });

        await complimentRepository.save(compliment);

        return compliment;
    }

}

export { ComplimentService }