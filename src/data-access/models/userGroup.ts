import { DataTypes, Model } from 'sequelize';

import { sequelize } from './index';
import { Group } from './group';
import { User } from './user';

export class UserGroup extends Model {
    public toJSON(): object {
        return { ...this.get(), UserId: undefined, GroupId: undefined };
    }
}
UserGroup.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        group_id: {
            type: DataTypes.UUID,
            references: {
                model: Group,
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'UserGroup',
        timestamps: false,
    },
);
