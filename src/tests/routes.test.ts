import request from 'supertest';

import app from '../index';

describe('Test User and Group Handlers', () => {
    test('responds to GET /users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });

    test('responds to GET /groups', async () => {
        const res = await request(app).get('/groups');
        expect(res.statusCode).toBe(200);
    });

    test('responds to POST /users', async () => {
        const res = await request(app).post('/users').send({
            login: 'test',
            password: 'test123',
            age: 25,
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeTruthy();
        expect(res.body.data.id).toBeTruthy();
        expect(res.body.meta).toBeTruthy();
        expect(res.body.data.login).toEqual('test');
    });
});
