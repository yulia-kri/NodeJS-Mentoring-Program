import { Router } from 'express';

import {
    createGroup,
    createUser,
    deleteGroup,
    deleteUser,
    getGroupById,
    getGroups,
    getUserById,
    getUsers,
    updateGroup,
    updateUser,
} from './controllers';
import { validateSchema } from '../validation/validation';
import { createUserSchema, updateUserSchema } from '../validation/schema';

export const routes = (router: Router) => {
    router.route('/users').get(getUsers).post(validateSchema(createUserSchema), createUser);

    router.route('/users/:uuid').get(getUserById).put(validateSchema(updateUserSchema), updateUser).delete(deleteUser);

    router.route('/groups').get(getGroups).post(createGroup);

    router.route('/groups/:uuid').get(getGroupById).put(updateGroup).delete(deleteGroup);
};
