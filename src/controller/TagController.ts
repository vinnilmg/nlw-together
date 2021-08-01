import { Request, response, Response } from 'express';
import { TagService } from '../service/TagService';

class TagController {

    async handle(request: Request, response: Response) {
        const { nome } = request.body;

        const tagService = new TagService();

        const tag = await tagService.execute(nome);

        return response.json(tag);
    }

    async listTags(request: Request, response: Response) {
        //console.log('listando tags');
        const tagService = new TagService();

        const tags = await tagService.listTags();

        return response.json(tags);
    }

}

export { TagController };