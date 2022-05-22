import { Router } from 'express';

import { createUser, deleteUser, getUserById, getUsers, updateUser } from './controllers';
import { validateSchema } from './validation';
import { createUserSchema, updateUserSchema } from './schema';

export const routes = (router: Router) => {
    router.route('/user').get(getUsers).post(validateSchema(createUserSchema), createUser);

    router
        .route('/user/:userId')
        .get(getUserById)
        .post(validateSchema(createUserSchema), createUser)
        .put(validateSchema(updateUserSchema), updateUser)
        .delete(deleteUser);
};
