/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const supertest = require('supertest');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');

const app = require('../server');

const request = supertest(app);

const user1 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061988888888',
    gender: 'M',
    bond: 'Psychologist',
    specialization: 'Psicólogo',
    biography: '',
};

const user2 = {
    name: 'Rafael',
    lastName: 'Leão',
    email: 'email2@email.com',
    phone: '061988888888',
    gender: 'M',
    bond: 'Psychologist',
    specialization: 'Psicólogo',
    biography: '',
};

const user3 = {
    name: 'teste',
    lastName: 'abner',
    email: null,
    gender: 'M',
    phone: '',
    bond: 'Psychologist',
    specialization: 'Psicólogo',
    biography: '',
};

const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

describe('Psychologist API', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    });

    beforeEach(async () => {
        await Psychologist.collection.deleteMany({});
        await UserPatient.collection.deleteMany({});
        await request.post('/admin').send(admin);
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should be able to create a new psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        const response = await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        const response = await request.post('/psychologist').send(user3).set('authorization', TokenAdmin);

        expect(response.status).toBe(203);
    });

    it('should be able to update a psychologist password', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);

        const responseDelete = await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: '123456789' }).set('authorization', TokenAdmin);

        expect(responseDelete.status).toBe(200);
    });

    it('should be able to list all the psychologists', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);
        await request.post('/psychologist').send(user2).set('authorization', TokenAdmin);

        const response = await request.get('/psychologists').set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });

    it('should be able to return a single psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);

        const response = await request.get(`/psychologist/${user1.email}`).set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });

    it('should be able to delete a psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);

        const responseDelete = await request.delete(
            `/psychologist/${user1.email}`,
        ).set('authorization', TokenAdmin);

        expect(responseDelete.status).toBe(200);
    });

    it('should be able to update a psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);
        await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: '123456789' }).set('authorization', TokenAdmin);
        const response2 = await request.post('/login/psychologist').send({ email: user1.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const responseUpdate = await request
            .put(`/psyUpdate/${user1.email}`)
            .send({
                name: 'teste',
                lastName: 'abner',
                email: 'abcdefghij@hotmail.com',
                gender: 'M',
                bond: 'graduando',
                specialization: 'Formado na UnB',
                biography: '2020200',
            }).set('authorization', TokenPsy);

        expect(responseUpdate.status).toBe(200);
    });

    it('should not be able to update a psychologist', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);
        await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: '123456789' }).set('authorization', TokenAdmin);
        const response2 = await request.post('/login/psychologist').send({ email: user1.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const responseUpdate = await request.put(`/psyUpdate/${null}`).send({
            name: 'teste',
            lastName: 'abner',
            email: 'abcdefghij@hotmail.com',
            gender: 'M',
            bond: 'graduando',
            specialization: 'Formado na UnB',
            biography: '2020200',
        }).set('authorization', TokenPsy);

        expect(responseUpdate.status).toBe(500);
    });

    it('should not be able to update a psychologist password', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(user1).set('authorization', TokenAdmin);
        await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: '123456789' }).set('authorization', TokenAdmin);
        const response2 = await request.post('/login/psychologist').send({ email: user1.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const responseDelete = await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: null }).set('authorization', TokenPsy);

        expect(responseDelete.status).toBe(500);
    });
});
