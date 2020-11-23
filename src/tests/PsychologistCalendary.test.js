const mongoose = require('mongoose');
const supertest = require('supertest');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const app = require('../server');

const request = supertest(app);

const email = {
    email: 'email@email.com',
};

const psy = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    gender: 'M',
    bond: 'graduando',
    phone: '061981353485',
    specialization: 'psicólogo',
    biography: '',
};
const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};
const userUpdateweekDay = {
    email: 'email@email.com',
    weekDay: [
        {
            weekDay: '2',
            from: '12:12',
            to: '12:12',
            id: '0',
        },
        {
            weekDay: 0,
            from: '15:15',
            to: '03:15',
            id: 1,
        },
        {
            weekDay: 0,
            from: '01:12',
            to: '00:12',
            id: 2,
        },
    ],
};
const UserUpdateRestrict = {
    email: 'email@email.com',
    restrict: [[{ year: '2021', day: '20', month: '11' }]],
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
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(psy).set('authorization', TokenAdmin);
        const psyNew = await request.get(`/psychologist/${psy.email}`).set('authorization', TokenAdmin);
        await request.put(`/psyUpdatePassword/${psy.email}`).send({ oldPassword: psyNew.body.password, password: '123456789' }).set('authorization', TokenAdmin);
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
    it('should be able to update a psychologist week_day', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psy.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const errResponse = await request.put('/calendary/update').send({
            email: '',
        }).set('authorization', TokenPsy);
        expect(errResponse.status).toBe(404);

        const WeekUpdate = await request
            .put('/calendary/update')
            .send(userUpdateweekDay).set('authorization', TokenPsy);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to update a psychologist Restrict', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psy.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const WeekUpdate = await request
            .put('/calendary/update')
            .send(UserUpdateRestrict).set('authorization', TokenPsy);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to show a psychologist schedule', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psy.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const psychologist = await request.post('/calendary/update').send(email).set('authorization', TokenPsy);
        expect(psychologist.status).toBe(200);
    });
    it('should be able to show a psychologist restrict', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psy.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const errResponse = await request
            .post('/calendary/restrict')
            .send({ email: 'test@email.com' }).set('authorization', TokenPsy);
        expect(errResponse.status).toBe(400);

        const psychologist = await request
            .post('/calendary/restrict')
            .send(email).set('authorization', TokenPsy);
        expect(psychologist.status).toBe(200);
    });
});
