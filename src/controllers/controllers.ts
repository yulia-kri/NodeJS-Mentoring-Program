import { HttpCode } from '../models/interfaces';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { addPagination } from '../services/pagination';

export const usersStorage = new UserService();

export const getUserById = async (req: any, res: any) => {
    const { userId } = req.params;
    const user = await usersStorage.findById(userId);

    if (user != null) {
        res.send(user);
    } else {
        res.status(HttpCode.NotFound).send('User was not found.');
    }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;

    try {
        const user = await usersStorage.addItem(newUser);
        res.status(HttpCode.OK).send(user);
        next();
    } catch (err) {
        res.status(HttpCode.BadRequest).send(err.message);
    }
};

export const updateUser = async (req: any, res: any) => {
    const { userId } = req.params;
    const newUser = req.body;

    try {
        const user = await usersStorage.updateItem({ id: userId, ...newUser });
        res.send(user);
    } catch (err) {
        res.status(HttpCode.NotFound).send(err.message);
    }
};

export const deleteUser = async (req: any, res: any) => {
    const { userId } = req.params;

    try {
        const msg = await usersStorage.deleteItem(userId);
        res.send(msg);
    } catch (err) {
        res.status(HttpCode.NotFound).send(err.message);
    }
};

export const getUsers = async (req: any, res: any) => {
    const { limit, loginSubstring, skip } = req.query;

    if (limit && loginSubstring) {
        const users = await usersStorage.getAutoSuggestUsers(limit, loginSubstring);
        res.send(addPagination(users, skip, limit));
    }

    const users = await usersStorage.allItems();
    res.send(addPagination(users, skip, limit));
};
