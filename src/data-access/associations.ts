import { User } from './models/user';
import { Group } from './models/group';
import { UserGroup } from './models/userGroup';

export function associate() {
    User.belongsToMany(Group, { through: UserGroup, onDelete: 'CASCADE', hooks: true  });
    Group.belongsToMany(User, { through: UserGroup, onDelete: 'CASCADE', hooks: true  });
}
