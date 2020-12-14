const mongoose = require('mongoose');
const supertest = require('supertest');
const Admin = require('../models/Admin');

const app = require('../server');

const request = supertest(app);

const user = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

describe('Admin API', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    beforeEach(async () => {
        await Admin.collection.deleteMany({});
    });

    it('should be able to register an admin', async () => {
        const response = await request.post('/admin').send(user);

        expect(response.status).toBe(201);

        const respose2 = await request.post('/admin').send(user);
        expect(respose2.status).toBe(409);
    });

    it('should not be able to register an admin', async () => {
        const errResponse = await request.post('/admin')
            .send({
                name: 'Vinicius',
                email: 'email@email',
            });

        expect(errResponse.status).toBe(400);
    });

    it('should be able to login an admin', async () => {
        await request.post('/admin').send(user);
        const { email, password } = user;
        const response = await request
            .post('/admin/login')
            .send({ email, password });
        expect(response.status).toBe(200);
    });
    it('should be not fould admin acount', async () => {
        const email2 = 'testemail@test.com';
        const password2 = 'nopassword';

        const response2 = await request
            .post('/admin/login')
            .send({ email: email2, password: password2 });
        expect(response2.status).toBe(404);
    });
    it('should be able, whong password to admin login', async () => {
        await request.post('/admin').send(user);
        const { email } = user;
        const password2 = 'nopassword';
        const response3 = await request
            .post('/admin/login')
            .send({ email, password: password2 });
        expect(response3.status).toBe(400);
    });
});
