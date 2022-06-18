import { Group as TGroup } from '../models/interfaces';
import { Repository } from '../models/repository';
import { Group } from '../data-access/models/group';

type IncomingGroup = Omit<TGroup, 'id'>;

export class GroupService extends Repository<Group, TGroup> {
    constructor() {
        super(Group);
    }

    public async update(id: string, updatedGroup: Partial<IncomingGroup>) {
        const { name, permissions } = updatedGroup;
        const group = await this.findOne(id);

        if (group == null) {
            throw new Error('Item not found.');
        }

        if (name) {
            group.name = name;
        }
        if (permissions) {
            group.permissions = permissions;
        }

        await group.save();

        return group;
    }
}
