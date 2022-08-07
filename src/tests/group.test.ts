import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import { fakeGroups } from './fake';
import { Group } from '../data-access/models/group';
import express from 'express';
import { routes } from '../controllers/routes';

describe('Group Router', () => {
    const defaultPath = '/groups';
    const app = express();
    const router = express.Router();
    routes(router);
    app.use(express.json());
    app.use(router);

    beforeAll(async () => {
        await Group.sync({ force: true });
        await Group.bulkCreate(fakeGroups);
    });

    it('should return mock groups in respond to GET /groups', async () => {
        const res = await request(app).get(defaultPath);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.pagination.skip).toEqual(0);
    });

    it('should return 404 status code in respond to GET /groups/{uuid} with incorrect group id', async () => {
        const res = await request(app).get(`${defaultPath}/d359f17c-db16-4c8c-87ce-4effa8ccf89d`);

        expect(res.statusCode).toBe(404);
    });

    it('should return new group in respond to POST /groups', async () => {
        const newGroup = {
            name: 'read_and_write',
            permissions: ['READ', 'WRITE'],
        };
        const res = await request(app).post(defaultPath).send(newGroup);

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBeTruthy();
        expect(res.body).toMatchObject(newGroup);
    });

    it('should return updated group in respond to PUT /groups/{uuid}', async () => {
        const { body } = await request(app).get(`${defaultPath}?loginSubstring=group&limit=1`);
        const [{ id }] = body.data;
        const name = 'test_group';

        const res = await request(app).put(`${defaultPath}/${id}`).send({
            name,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toEqual(name);
    });

    it('respond to DELETE /groups/{uuid}', async () => {
        const { body } = await request(app).get(`${defaultPath}?loginSubstring=group&limit=1`);
        const [{ id }] = body.data;
        const res = await request(app).delete(`${defaultPath}/${id}`);

        expect(res.statusCode).toBe(200);
    });
});
