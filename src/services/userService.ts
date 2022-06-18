import { User as TUser } from '../models/interfaces';
import { User } from '../data-access/models/user';
import { Op } from 'sequelize';
import { Repository } from '../models/repository';

type IncomingUser = Omit<TUser, 'id' | 'isDeleted'>;

export class UserService extends Repository<User, TUser> {
    constructor() {
        super(User);
    }

    public async update(id: string, updatedUser: Partial<IncomingUser>) {
        const { login, age, password } = updatedUser;
        const user = await this.findOne(id);

        if (user == null) {
            throw new Error('Item not found.');
        }

        if (login) {
            user.login = login;
        }
        if (password) {
            user.password = password;
        }
        if (age) {
            user.age = age;
        }

        await user.save();

        return user;
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
