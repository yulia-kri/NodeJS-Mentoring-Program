import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import { User } from '../data-access/models/user';
import { fakeUsers } from './fake';
import express from 'express';
import { routes } from '../controllers/routes';

describe('User Router', () => {
    const defaultPath = '/users';
    const app = express();
    const router = express.Router();
    routes(router);
    app.use(express.json());
    app.use(router);

    beforeAll(async () => {
        await User.sync({ force: true });
        await User.bulkCreate(fakeUsers);
    });

    it('should return mock users in respond to GET /users', async () => {
        const res = await request(app).get(defaultPath);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.body.pagination.skip).toEqual(0);
    });

    it('should return up to 2 users in respond to GET /users?loginSubstring={loginSubstring}&limit={limit}', async () => {
        const res = await request(app).get(`${defaultPath}?loginSubstring=user&limit=2`);

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeDefined();
        expect(res.body.data.length).toBeLessThanOrEqual(2);
        expect(res.body.pagination.total).toBeLessThanOrEqual(2);
    });

    it('should return a single user in respond to GET /users/{uuid}', async () => {
        const [user] = fakeUsers;
        const { id, login, password, age } = user;
        const res = await request(app).get(`${defaultPath}/${user.id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toMatchObject({ id, login, password, age });
    });

    it('should return new user in respond to POST /users', async () => {
        const newUser = {
            login: 'user6',
            password: 'abc123',
            age: 30,
        };
        const res = await request(app).post(defaultPath).send(newUser);

        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBeTruthy();
        expect(res.body.login).toBe(newUser.login);
        expect(res.body.password).toBe(newUser.password);
        expect(res.body.age).toBe(newUser.age);
    });

    it('should return updated user in respond to PUT /users/{uuid}', async () => {
        const { body } = await request(app).get(`${defaultPath}?loginSubstring=user&limit=1`);
        const [{ id }] = body.data;
        const login = 'test_user';

        const res = await request(app).put(`${defaultPath}/${id}`).send({
            login,
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.login).toEqual(login);
    });

    it('respond to DELETE /users/{uuid}', async () => {
        const { body } = await request(app).get(`${defaultPath}?loginSubstring=user&limit=1`);
        const [{ id }] = body.data;
        const res = await request(app).delete(`${defaultPath}/${id}`);

        expect(res.statusCode).toBe(200);
    });
});
