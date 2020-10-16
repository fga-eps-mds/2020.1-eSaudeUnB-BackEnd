/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const supertest = require('supertest');
const Psychologist = require('../models/Psychologist');

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
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should be able to create a new psychologist', async () => {
        const response = await request.post('/psychologist').send(user1);

        expect(response.status).toBe(201);
    });

    it('should not be able to create a new psychologist', async () => {
        const response = await request.post('/psychologist').send(user3);

        expect(response.status).toBe(203);
    });

    it('should be able to list all the psychologists', async () => {
        await request.post('/psychologist').send(user1);
        await request.post('/psychologist').send(user2);

        const response = await request.get('/psychologists');

        expect(response.status).toBe(200);
    });

    it('should be able to return a single psychologist', async () => {
        await request.post('/users').send(user1);

        const response = await request.get(`/psychologist/${user1.email}`);

        expect(response.status).toBe(200);
    });

    it('should be able to delete a psychologist', async () => {
        await request.post('/psychologist').send(user1);

        const responseDelete = await request.delete(
            `/psychologist/${user1.email}`,
        );

        expect(responseDelete.status).toBe(200);
    });

    it('should be able to update a psychologist', async () => {
        await request.post('/psychologist').send(user1);

        const responseDelete = await request
            .put(`/psyUpdate/${user1.email}`)
            .send({
                name: 'teste',
                lastName: 'abner',
                email: 'abcdefghij@hotmail.com',
                gender: 'M',
                bond: 'graduando',
                specialization: 'Formado na UnB',
                biography: '2020200',
            });

        expect(responseDelete.status).toBe(200);
    });

    it('should not be able to update a psychologist', async () => {
        await request.post('/psychologist').send(user1);

        const responseDelete = await request.put(`/psyUpdate/${null}`).send({
            name: 'teste',
            lastName: 'abner',
            email: 'abcdefghij@hotmail.com',
            gender: 'M',
            bond: 'graduando',
            specialization: 'Formado na UnB',
            biography: '2020200',
        });

        expect(responseDelete.status).toBe(500);
    });

    it('should be able to update a psychologist password', async () => {
        await request.post('/psychologist').send(user1);

        const responseDelete = await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: 123 });

        expect(responseDelete.status).toBe(200);
    });

    it('should not be able to update a psychologist password', async () => {
        await request.post('/psychologist').send(user1);

        const responseDelete = await request
            .put(`/psyUpdatePassword/${user1.email}`)
            .send({ password: null });

        expect(responseDelete.status).toBe(500);
    });
});
