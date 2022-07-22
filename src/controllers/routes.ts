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
    router.route('/users').get(verifyToken, getUsers).post(verifyToken, validateSchema(createUserSchema), createUser);

    router
        .route('/users/:uuid')
        .get(verifyToken, getUserById)
        .put(verifyToken, validateSchema(updateUserSchema), updateUser)
        .delete(deleteUser);

    router.route('/groups').get(verifyToken, getGroups).post(verifyToken, createGroup);

    router
        .route('/groups/:uuid')
        .get(verifyToken, getGroupById)
        .put(verifyToken, updateGroup)
        .delete(verifyToken, deleteGroup);

    router.route('/usersToGroup').post(verifyToken, addUsersToGroup);

    router.route('/login').post(login);
};
