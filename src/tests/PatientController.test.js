/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const supertest = require('supertest');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

const app = require('../server');

const request = supertest(app);

const user1 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061999999999',
    password: 'password',
    unbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
};

const user2 = {
    name: 'Rafael',
    lastName: 'Leão',
    email: 'email2@email.com',
    phone: '061988888888',
    password: 'password',
    unbRegistration: '180000001',
    gender: 'M',
    bond: 'graduando',
};

const user3 = {
    name: 'Lucas',
    lastName: 'Henrique',
    email: 'lucasHenrique@hotmail.com',
    phone: '0619856482',
    password: 'password',
    unbRegistration: '190019158',
    gender: 'M',
    bond: 'graduando',
};

const user4 = {
    name: 'Abner',
    lastName: 'Filipe',
    email: 'abner@hotmail.com',
    phone: '06187832902',
    password: 'password',
    unbRegistration: '1900267842',
    gender: 'M',
    bond: 'graduando',
    civilStatus: 'Casado',
    religion: 'Evangelico',
    userImage: 'data:image/png;base64,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',
};

const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

describe('Patient API', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    });

    beforeEach(async () => {
        await UserPatient.collection.deleteMany({});
        await Psychologist.collection.deleteMany({});
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should be able to return a user', async () => {
        await request.post('/users').send(user1);

        await request.post('/admin').send(admin);
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;

        const response = await request.get(`/user/${user1.email}`).set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });

    it('should be able to list all the users', async () => {
        await request.post('/users').send(user1);
        await request.post('/users').send(user2);

        await request.post('/admin').send(admin);
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;

        const response = await request.get('/users').set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });

    it('should be able to create a new user', async () => {
        const response = await request.post('/users').send(user1);

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new user', async () => {
        const response = await request.post('/users').send({
            name: 'Rafael',
            lastName: null,
            email: 'teste@hotmail.com',
            phone: '061988888888',
            password: 'password',
            unbRegistration: '180000001',
            gender: 'M',
            bond: 'graduando',
            userImage: 'data:image/png;base64,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',
        });
        await request.post('/users').send(user2);
        const response2 = await request.post('/users').send(user2);

        expect(response.status).toBe(203);
        expect(response2.status).toBe(409);
    });

    it('should be able to delete a user', async () => {
        await request.post('/users').send(user1);

        const respose = await request.post('/login/patient').send({ email: user1.email, password: user1.password });
        const TokenPatient = respose.body.accessToken;

        const responseDelete = await request.delete('/user').send({
            email: 'teste@hotmail.com',
        }).set('authorization', TokenPatient);

        expect(responseDelete.status).toBe(200);
    });

    it('should be able to update a user', async () => {
        await request.post('/users').send(user3);

        const respose = await request.post('/login/patient').send({ email: user3.email, password: user3.password });
        const TokenPatient = respose.body.accessToken;

        const response = await request
            .put(`/user/${user3.email}`)
            .send(user4)
            .set('authorization', TokenPatient);

        expect(response.status).toBe(200);
    });

    it('should be able to update a user password', async () => {
        await request.post('/users').send(user3);

        const response = await request.post('/login/patient').send({ email: user3.email, password: user3.password });
        const TokenPatient = response.body.accessToken;

        const responseUpdate = await request
            .put(`/user/password/${user3.email}`)
            .send({oldPassword:user3.password, password: '12345678' })
            .set('authorization', TokenPatient);

        expect(responseUpdate.status).toBe(200);
    });
});
