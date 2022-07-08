import { Router } from 'express';

import { createUser, deleteUser, getUserById, getUsers, updateUser } from './controllers';
import { validateSchema } from '../services/validation';
import { createUserSchema, updateUserSchema } from '../models/schema';

export const routes = (router: Router) => {
    router.route('/user').post(validateSchema(createUserSchema), createUser);

    router.route('/users').get(getUsers);

    router
        .route('/user/:userId')
        .get(getUserById)
        .post(validateSchema(createUserSchema), createUser)
        .put(validateSchema(updateUserSchema), updateUser)
        .delete(deleteUser);
};
