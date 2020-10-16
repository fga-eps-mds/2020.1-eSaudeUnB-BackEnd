const mongoose = require('mongoose');
const supertest = require('supertest');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const app = require('../server');

const request = supertest(app);

const email = {
    email: 'email@email.com',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    gender: 'M',
    bond: 'graduando',
    phone: '061981353485',
    specialization: 'psicólogo',
    biography: '',
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
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
    it('should be able to update a psychologist week_day', async () => {
        const errResponse = await request.put('/calendary/update').send({
            email: '',
        });
        expect(errResponse.status).toBe(404);

        await request.post('/psychologist').send(user);
        const WeekUpdate = await request
            .put('/calendary/update')
            .send(userUpdateweekDay);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to update a psychologist Restrict', async () => {
        await request.post('/psychologist').send(user);
        const WeekUpdate = await request
            .put('/calendary/update')
            .send(UserUpdateRestrict);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to show a psychologist schedule', async () => {
        await request.post('/psychologist').send(user);
        const psychologist = await request.post('/calendary/update').send(email);
        expect(psychologist.status).toBe(200);
    });
    it('should be able to show a psychologist restrict', async () => {
        const errResponse = await request
            .post('/calendary/restrict')
            .send({ email: 'test@email.com' });
        expect(errResponse.status).toBe(400);

        await request.post('/psychologist').send(user);
        const psychologist = await request
            .post('/calendary/restrict')
            .send(email);
        expect(psychologist.status).toBe(200);
    });
});
