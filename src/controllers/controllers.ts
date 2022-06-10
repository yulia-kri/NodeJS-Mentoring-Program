import { ItemsStorage } from '../services/storage';
import { HttpCode, User } from '../models/models';
import { NextFunction, Request, Response } from 'express';
import { db } from '../data-access/db';

const UserModel = db.user;
const usersStorage = new ItemsStorage<User>(UserModel);

export const getUserById = async (req: any, res: any) => {
    const { userId } = req.params;
    const user = await UserModel.findByPk(userId);

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
        const user = await usersStorage.deleteItem(userId);
        res.send(user);
    } catch (err) {
        res.status(HttpCode.NotFound).send(err.message);
    }
};

export const getUsers = async (req: any, res: any) => {
    const { limit, loginSubstring } = req.query;

    if (limit && loginSubstring) {
        const condition = {
            login: db.sequelize.where(
                db.sequelize.fn('LOWER', db.sequelize.col('login')),
                'LIKE',
                `%${loginSubstring.toLowerCase()}%`,
            ),
        };

        UserModel.findAll({ where: condition }).then(users => {
            if (users) {
                res.json(users.slice(0, limit));
            } else {
                res.status(HttpCode.NotFound).end();
            }
        });
    }

    res.send(await usersStorage.getAllItems());
};
