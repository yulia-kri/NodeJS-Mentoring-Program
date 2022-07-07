import { UserGroupService } from './../services/userGroupService';
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Controller } from '../models/controller';
import { GroupService } from '../services/groupService';
import { HttpCode } from '../models/interfaces';
import { addPagination } from '../helpers/pagination';

const usersController = new Controller(new UserService());
const groupsController = new Controller(new GroupService());
const userGroupService = new UserGroupService(new GroupService(), new UserService());

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
        const { groupId, userIds } = req.body;
        const result = await userGroupService.addUsersToGroup(groupId, userIds);
        res.send(result);
    } catch (err) {
        res.status(HttpCode.BadRequest).send(err.message);
    }
};
