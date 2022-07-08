import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';

export class User extends Model {
    declare login: string;
    declare password: string;
    declare age: number;

    toJSON() {
        return { ...this.get(), deleted_at: undefined, updated_at: undefined, created_at: undefined };
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
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        paranoid: true,
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        deletedAt: 'deleted_at',
    },
);
