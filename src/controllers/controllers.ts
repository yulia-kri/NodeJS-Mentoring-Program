import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { Controller } from '../models/controller';
import { GroupService } from '../services/groupService';

export const usersController = new Controller(new UserService());
export const groupsController = new Controller(new GroupService());

export const getUserById = (req: Request, res: Response) => usersController.getById(req, res);
export const createUser = (req: Request, res: Response) => usersController.create(req, res);
export const updateUser = (req: Request, res: Response) => usersController.update(req, res);
export const deleteUser = (req: Request, res: Response) => usersController.delete(req, res);
export const getUsers = (req: Request, res: Response) => usersController.getAll(req, res);

export const getGroupById = (req: Request, res: Response) => groupsController.getById(req, res);
export const createGroup = (req: Request, res: Response) => groupsController.create(req, res);
export const updateGroup = (req: Request, res: Response) => groupsController.update(req, res);
export const deleteGroup = (req: Request, res: Response) => groupsController.delete(req, res);
export const getGroups = (req: Request, res: Response) => groupsController.getAll(req, res);
