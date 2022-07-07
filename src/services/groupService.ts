import { Group as TGroup, IGroupRepository } from '../models/interfaces';
import { Repository } from '../models/repository';
import { Group } from '../data-access/models/group';
export class GroupService extends Repository<Group, TGroup> implements IGroupRepository<Group, TGroup> {
    constructor() {
        super(Group);
    }
}
