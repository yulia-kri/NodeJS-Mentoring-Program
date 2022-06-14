import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';

export class User extends Model {
    toJSON() {
        return { ...this.get(), id: undefined, is_deleted: undefined, updatedAt: undefined, createdAt: undefined };
    }
}
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    },
);
