import { UserService } from './userService';
import { GroupService } from './groupService';
import { Sequelize, Transaction } from 'sequelize/types';
import { sequelize } from '../data-access/models';
import { User } from '../data-access/models/user';

export class UserGroupService {
    private sequelize: Sequelize;

    constructor(private groupService: GroupService, private userService: UserService) {
        this.sequelize = sequelize;
    }

    public async addUsersToGroup(groupId: string, userIds: string[]) {
        try {
            return await this.sequelize.transaction(async (t: Transaction) => {
                const group = await this.groupService.findById(groupId, { transaction: t });
                const users = await Promise.all(
                    userIds.map(async userId => await this.userService.findById(userId, { transaction: t })),
                );

                if (group && users.length && !users.some(user => user == null)) {
                    await Promise.all((users as User[]).map(async user => await group.addUser(user)));
                    return group.getUsers();
                }

                return 'Group or user was not found.';
            });
        } catch (error) {
            return error;
        }
    }
}
