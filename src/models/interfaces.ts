import { NextFunction, Request, Response } from 'express';
import { Model } from 'sequelize';

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
export type Permission = typeof permissions;

export type Group = {
    id: string;
    name: string;
    permissions: Permission[];
};

export enum HttpCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
}

export interface IRepository<M extends Model, T> {
    create(item: T): Promise<M>;
    update(id: string, item: Partial<T>): Promise<M>;
    delete(id: string): Promise<string>;
    find(): Promise<M[]>;
    findOne(field: string, value: string): Promise<M | null>;
    findById(id: string): Promise<M | null>;
}

export interface IUserRepository<M extends Model, T> extends IRepository<M, T> {
    getAutoSuggestions(limit: string, loginSubstring: string): Promise<M[]>;
}

export interface IGroupRepository<M extends Model, T> extends IRepository<M, T> {}

type Middleware = (req: Request, res: Response, next?: NextFunction) => void | Promise<void>;

export interface IController<T> {
    service: IRepository<Model, T>;
    create: Middleware;
    update: Middleware;
    delete: Middleware;
    getById: Middleware;
    getAll: Middleware;
}
