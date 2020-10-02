const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../server');

const request = supertest(app);

const email = {
    email: 'viniciusfa.delima@gmail.com',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'viniciusfa.delima@gmail.com',
    password: 'password',
    unbunbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
    specialization: '',
    biography: '',
};
const userUpdateweekDay = {
    email: 'viniciusfa.delima@gmail.com',
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
    email: 'viniciusfa.delima@gmail.com',
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

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });
    it('should be able to update a psychologist week_day', async () => {
        await request.post('/admin/psy/create').send(user);
        const WeekUpdate = await request
            .put('/calendary/update')
            .send(userUpdateweekDay);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to update a psychologist Restrict', async () => {
        await request.post('/admin/psy/create').send(user);
        const WeekUpdate = await request
            .put('/calendary/update')
            .send(UserUpdateRestrict);
        expect(WeekUpdate.status).toBe(200);
    });
    it('should be able to show a psychologist schedule', async () => {
        await request.post('/admin/psy/create').send(user);
        const psychologo = await request.post('/calendary/update').send(email);
        expect(psychologo.status).toBe(200);
    });
    it('should be able to show a psychologist restrict', async () => {
        await request.post('/admin/psy/create').send(user);
        const psychologo = await request
            .post('/calendary/restrict')
            .send(email);
        expect(psychologo.status).toBe(200);
    });
});
