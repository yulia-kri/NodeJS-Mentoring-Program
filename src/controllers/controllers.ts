import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserGroupService } from './../services/userGroupService';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Controller } from '../models/controller';
import { GroupService } from '../services/groupService';
import { HttpCode } from '../models/interfaces';
import { addPagination } from '../helpers/pagination';

const userService = new UserService();
const groupService = new GroupService();

const usersController = new Controller(userService);
const groupsController = new Controller(groupService);
const userGroupService = new UserGroupService(groupService, userService);

const getAllUsersWithAutoSuggestion = async (req: Request, res: Response) => {
    const { limit, loginSubstring, skip } = req.query as { [param: string]: string | undefined };

    if (limit && loginSubstring) {
        const items = await (usersController.service as UserService).getAutoSuggestions(limit, loginSubstring);
        return res.send(addPagination(items, skip, limit));
    }

    await usersController.getAll(req, res);
};

export const getUserById = (req: Request, res: Response) => usersController.getById(req, res);
export const createUser = (req: Request, res: Response) => usersController.create(req, res);
export const updateUser = (req: Request, res: Response) => usersController.update(req, res);
export const deleteUser = (req: Request, res: Response) => usersController.delete(req, res);
export const getUsers = (req: Request, res: Response) => getAllUsersWithAutoSuggestion(req, res);

export const getGroupById = (req: Request, res: Response) => groupsController.getById(req, res);
export const createGroup = (req: Request, res: Response) => groupsController.create(req, res);
export const updateGroup = (req: Request, res: Response) => groupsController.update(req, res);
export const deleteGroup = (req: Request, res: Response) => groupsController.delete(req, res);
export const getGroups = (req: Request, res: Response) => groupsController.getAll(req, res);

export const addUsersToGroup = async (req: Request, res: Response) => {
    try {
        const { uuid: groupId } = req.params;
        const { userIds } = req.body;
        const result = await userGroupService.addUsersToGroup(groupId, userIds);
        res.send(result);
    } catch (err) {
        res.status(HttpCode.BadRequest).send(err.message);
    }
};

export const login = async (req: Request, res: Response) => {
    const { login: name, password } = req.body;

    const user = await userService.findOne('login', name);

    if (user == null || password == null) {
        return res.status(HttpCode.BadRequest).send('Invalid credentials');
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign({ name }, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '10d' });
            res.send({ accessToken });
        } else {
            res.status(HttpCode.BadRequest).send('Invalid credentials');
        }
    } catch (err) {
        res.status(HttpCode.BadRequest).send(err.message);
    }
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader?.split(' ')[1];

    if (token == null) return res.sendStatus(HttpCode.Unauthorized);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', err => {
        if (err) return res.sendStatus(HttpCode.Forbidden);
        next();
    });
};
