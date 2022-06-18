import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Permission, permissions } from '../../models/interfaces';

export class Group extends Model {
    declare name: string;
    declare permissions: Permission[];

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
