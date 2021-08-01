import { EntityRepository, Repository } from 'typeorm';
import { Tag } from '../entity/Tag';

@EntityRepository(Tag)
class TagsRepository extends Repository<Tag> {}

export{ TagsRepository }