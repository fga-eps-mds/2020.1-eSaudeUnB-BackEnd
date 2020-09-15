const supertest = require('supertest');
const app = require('../server');
const models = require('../models');

const UserPatient = models.Patient;

const request = supertest(app);

const user1 = JSON.parse({
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'viniciusfa.delima@gmail.com',
    phone: '061999999999',
    password: 'password',
    unbunbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
});

const user2 = JSON.parse({
    name: 'Rafael',
    lastName: 'Leão',
    email: 'rafaelltm10@hotmail.com',
    phone: '061988888888',
    password: 'password',
    unbRegistration: '180000001',
    gender: 'M',
    bond: 'graduando',
});

describe('Patient', () => {
    beforeEach(() => UserPatient.sync({ force: true }));

    afterAll(() => UserPatient.drop());

    it('should be able to return a user', async (done) => {
        await request.post('/users').send(user1);

        const users = await request.get('/users');
        const { id } = JSON.parse(users.text)[0];

        const response = await request.get(`/users/${id}`);

        expect(response.status).toBe(200);
        done();
    });

    it('should be able to list all the users', async (done) => {
        await request.post('/users').send(user1);

        await request.post('/users').send(user2);

        const response = await request.get('/users');

        expect(JSON.parse(response.text).length).toBe(2);
        expect(response.status).toBe(200);
        done();
    });

    it('should be able to create a new user', async (done) => {
        const response = await request.post('/users').send({
            name: 'Rafael',
            lastName: null,
            email: 'rafaelltm10@hotmail.com',
            phone: '061988888888',
            password: 'password',
            unbRegistration: '180000001',
            gender: 'M',
            bond: 'graduando',
        });

        expect(response.status).toBe(401);

        const response2 = await request.post('/users').send(user2);

        const responseGet = await request.get('/users');

        expect(response2.status).toBe(200);
        expect(JSON.parse(responseGet.text).length).toBe(1);

        done();
    });

    it('should be able to delete a user', async (done) => {
        await request.post('/users').send(user1);

        const users = await request.get('/users');
        const { id } = JSON.parse(users.text)[0];

        const responseDelete = await request.delete(`/users/${id}`);

        const response = await request.get('/users');

        expect(responseDelete.status).toBe(200);
        expect(JSON.parse(response.text).length).toBe(0);
        done();
    });

    it('should be able to update a user', async (done) => {
        await request.post('/users').send(user1);

        const users = await request.get('/users');
        const { id } = JSON.parse(users.text)[0];

        const response = await request.put(`/users/${id}`).send(user2);

        const users1 = await request.get('/users');
        const { name } = JSON.parse(users1.text)[0];

        expect(name).toBe('Rafael');
        expect(response.status).toBe(200);
        done();
    });
});
