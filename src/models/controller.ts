import { Model } from 'sequelize';

import { HttpCode, IController, IRepository } from './interfaces';
import { Request, Response } from 'express';
import { addPagination } from '../helpers/pagination';

export class Controller<T> implements IController<T> {
    constructor(public service: IRepository<Model, T>) {}

    async create(req: Request, res: Response) {
        const newFields = req.body;

        try {
            const user = await this.service.create(newFields);
            res.status(HttpCode.OK).send(user);
        } catch (err) {
            res.status(HttpCode.BadRequest).send(err.message);
        }
    }

    async update(req: Request, res: Response) {
        const { uuid } = req.params;
        const newItem = req.body;

        try {
            const item = await this.service.update(uuid, newItem);
            res.send(item);
        } catch (err) {
            res.status(HttpCode.NotFound).send(err.message);
        }
    }

    async delete(req: Request, res: Response) {
        const { uuid } = req.params;

        try {
            const msg = await this.service.delete(uuid);
            res.send(msg);
        } catch (err) {
            res.status(HttpCode.NotFound).send(err.message);
        }
    }

    async getById(req: Request, res: Response) {
        const { uuid } = req.params;
        const item = await this.service.findOne(uuid);

        if (item != null) {
            res.send(item);
        } else {
            res.status(HttpCode.NotFound).send('Item was not found.');
        }
    }

    async getAll(req: Request, res: Response) {
        const { limit, loginSubstring, skip } = req.query as { [param: string]: string | undefined };

        let items: Model<T>[] = [];
        if (limit && loginSubstring && typeof this.service.getAutoSuggestions === 'function') {
            items = await this.service.getAutoSuggestions(limit, loginSubstring);
        } else {
            items = await this.service.find();
        }

        res.send(addPagination(items, skip, limit));
    }
}
