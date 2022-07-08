import { User as TUser } from '../models/interfaces';
import { User } from '../data-access/models/user';
import { Op } from 'sequelize';

type IncomingUser = Omit<TUser, 'id' | 'isDeleted'>;

export class UserService {
    public async findById(id: string) {
        return await User.findByPk(id);
    }

    public async addItem(user: IncomingUser) {
        return await User.create(user);
    }

    public async updateItem(updatedUser: Partial<IncomingUser> & { id: string }) {
        const { id, login, age, password } = updatedUser;
        const user = await this.findById(id);

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

    public async deleteItem(id: string) {
        try {
            await User.destroy({ where: { id } });
            return 'User was deleted.';
        } catch (e) {
            throw new Error('Item not found.');
        }
    }

    public async allItems() {
        return await User.findAll();
    }

    public async getAutoSuggestUsers(limit: number, loginSubstring: string) {
        return await User.findAll({
            limit,
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}`,
                },
            },
        });
    }
}
