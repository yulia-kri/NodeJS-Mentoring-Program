import { DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model } from 'sequelize';

import { sequelize } from './index';
import { Permission, permissions } from '../../models/interfaces';
import { User } from './user';

export class Group extends Model {
    declare id: string;
    declare name: string;
    declare permissions: Permission[];

    declare getUsers: HasManyGetAssociationsMixin<User>;
    declare addUser: HasManyAddAssociationMixin<User, number>;

    toJSON() {
        return { ...this.get(), updated_at: undefined, created_at: undefined };
    }
}

Group.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        permissions: DataTypes.ARRAY(
            DataTypes.ENUM({
                values: permissions,
            }),
        ),
    },
    {
        sequelize,
        modelName: 'Group',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
);
