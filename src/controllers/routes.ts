import { Router } from 'express';

import {
    addUsersToGroup,
    createGroup,
    createUser,
    deleteGroup,
    deleteUser,
    getGroupById,
    getGroups,
    getUserById,
    getUsers,
    login,
    updateGroup,
    updateUser,
    verifyToken,
} from './controllers';
import { validateSchema } from '../validation/validation';
import { createUserSchema, updateUserSchema } from '../validation/schema';

export const routes = (router: Router) => {
    router.route('/users').get(getUsers).post(validateSchema(createUserSchema), createUser);

    router.route('/users/:uuid').get(getUserById).put(validateSchema(updateUserSchema), updateUser).delete(deleteUser);

    router.route('/groups').get(getGroups).post(createGroup);

    router.route('/groups/:uuid').get(getGroupById).put(updateGroup).delete(deleteGroup);

    router.route('/usersToGroup').post(verifyToken, addUsersToGroup);

    router.route('/login').post(login);
};
