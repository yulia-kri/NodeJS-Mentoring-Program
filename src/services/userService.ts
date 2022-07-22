import bcrypt from 'bcrypt';

import { IUserRepository, User as TUser } from '../models/interfaces';
import { User } from '../data-access/models/user';
import { Op } from 'sequelize';
import { Repository } from '../models/repository';
export class UserService extends Repository<User, TUser> implements IUserRepository<User, TUser> {
    constructor() {
        super(User);
    }

    async create(item: TUser) {
        const { password } = item;
        const encryptedPassword = await bcrypt.hash(password, 10);
        return super.create({ ...item, password: encryptedPassword });
    }

    public async getAutoSuggestions(limit: string, loginSubstring: string) {
        return await User.findAll({
            limit: Number(limit),
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}`,
                },
            },
        });
    }
}
