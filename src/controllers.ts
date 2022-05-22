import { ItemsStorage } from './storage';
import { HttpCode, User } from './models';
import { getAutoSuggestUsers } from './utils';
import { NextFunction, Request, Response } from 'express';

export const usersStorage = new ItemsStorage<User>();

export const getUserById = (req: any, res: any) => {
    const { userId } = req.params;
    const user = usersStorage.findById(userId);

    if (user != null) {
        res.send(user);
    } else {
        res.status(HttpCode.NotFound).send('User was not found.');
    }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    try {
        const user = usersStorage.addItem(newUser);
        res.status(HttpCode.OK).send(user);
        next();
    } catch (err) {
        res.status(HttpCode.BadRequest).send(err.message);
    }
};

export const updateUser = (req: any, res: any) => {
    const { userId } = req.params;
    const newUser = req.body;

    try {
        const user = usersStorage.updateItem({ id: userId, ...newUser });
        res.send(user);
    } catch (err) {
        res.status(HttpCode.NotFound).send(err.message);
    }
};

export const deleteUser = (req: any, res: any) => {
    const { userId } = req.params;

    try {
        const user = usersStorage.deleteItem(userId);
        res.send(user);
    } catch (err) {
        res.status(HttpCode.NotFound).send(err.message);
    }
};

export const getUsers = (req: any, res: any) => {
    const { limit, loginSubstring } = req.query;

    if (limit && loginSubstring) {
        const users = getAutoSuggestUsers({ users: usersStorage.allItems, limit, loginSubstring });
        res.send(users);
    }

    res.send(usersStorage.allItems);
};
