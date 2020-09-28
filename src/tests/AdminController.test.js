const mongoose = require('mongoose');
const supertest = require('supertest');

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

    it('should be able to register an admin', async () => {
        const response = await request.post('/admin').send(user);

        expect(response.status).toBe(201);

        const respose2 = await request.post('/admin').send(user);
        expect(respose2.status).toBe(200);
    });

    it('should be able to login an admin', async () => {
        await request.post('/admin').send(user);
        const { email, password } = user;
        const response = await request
            .post('/admin/login')
            .send({ email, password });

        expect(response.status).toBe(200);

        const email2 = 'testemail@test.com';
        const password2 = 'password';

        const response2 = await request
            .post('/admin/login')
            .send({ email2, password2 });
        expect(response2.status).toBe(404);

        const response3 = await request
            .post('/admin/login')
            .send({ email, password2 });
        expect(response3.status).toBe(400);
    });
});
