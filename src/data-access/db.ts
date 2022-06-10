import { Sequelize } from 'sequelize';

import User from '../models/user.model';
import { database, password, user, options } from '../config/config';

const sequelize = new Sequelize(database, user, password, options);

export const db = {
    Sequelize,
    sequelize,
    user: (async () => await User(sequelize))(),
};
