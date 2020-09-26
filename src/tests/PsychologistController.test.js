const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../server');

const request = supertest(app);

const user1 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'viniciusfa.delima@gmail.com',
    password: 'password',
    unbunbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
    specialization: '',
    bibliography: '',
};

const user2 = {
    name: 'Rafael',
    lastName: 'Leão',
    email: 'rafaelltm10@hotmail.com',
    phone: '061988888888',
    password: 'password',
    unbRegistration: '180000001',
    gender: 'M',
    bond: 'graduando',
};

const update1 = {
    email: 'viniciusfa.delima@gmail.com',
    weekDay: [{
        weekDay: '2', from: '12:12', to: '12:12', id: '0',
    }, {
        weekDay: 0, from: '15:15', to: '03:15', id: 1,
    }, {
        weekDay: 0, from: '01:12', to: '00:12', id: 2,
    }],
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

    it('should be able to list all the psychologists', async () => {
        await request.post('/admin/psy/create').send(user1);
        await request.post('/admin/psy/create').send(user2);

        const response = await request.get('/admin/psy/list');

        expect(response.status).toBe(200);
    });

    it('should be able to create a new psychologist', async () => {
        const response = await request.post('/admin/psy/create').send(user1);

        expect(response.status).toBe(200);
    });

    it('should be able to delete a psychologist', async () => {
        await request.post('/admin/psy/create').send(user1);

        const responseDelete = await request.delete(`/admin/psy/${user1.email}`);

        expect(responseDelete.status).toBe(200);
    });
    it('should be able to update a psychologist week_day', async () => {
        const WeekUpdate = await request.put('/calendary/update').send(update1);

        expect(WeekUpdate.status).toBe(200);
    });
});
