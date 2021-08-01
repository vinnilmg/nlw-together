import { getCustomRepository } from "typeorm";
import { TagsRepository } from "../repository/TagsRepository";
import { classToPlain } from 'class-transformer';

class TagService {

    async execute(nome: string) {
        const tagRepository = getCustomRepository(TagsRepository);

        if(!nome) {
            throw new Error("Nome incorreto!");
        }

        const tagExiste = await tagRepository.findOne({
            nome
        });

        if(tagExiste) {
            throw new Error("Tag já existe!");
        }

        const tag = tagRepository.create({
            nome,
        });

        await tagRepository.save(tag);

        return tag;

    }

    async listTags() {
        const tagRepository = getCustomRepository(TagsRepository);

        const tags = await tagRepository.find();

        return classToPlain(tags);
    }
} 

export { TagService };