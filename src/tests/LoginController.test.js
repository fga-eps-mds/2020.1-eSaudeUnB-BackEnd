const mongoose = require('mongoose');
const supertest = require('supertest');

const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const app = require('../server');

const request = supertest(app);

const psyUser = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    password: 'password',
    unbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
    specialization: '',
    biography: '',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061999999999',
    password: 'password',
    unbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
};

describe('Login API', () => {
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

    it('should be able to succssessfully login an user', async () => {
        await request.post('/users').send(user);

        const { email, password } = user;

        const response = await request.post('/loginUser').send({ email, password });
        expect(response.status).toBe(200);
    });

    it('should fail to login an user', async () => {
        const response2 = await request.post('/loginUser').send({});
        expect(response2.status).toBe(404);

        const errResponse = await request.post('/loginUser').send(null);
        expect(errResponse.status).toBe(404);
    });

    it('should be able to succssessfully login an psychologist', async () => {
        await request.post('/admin/psy/create').send(psyUser);

        const { email, password } = psyUser;

        await request.put(`/psyUpdatePassword/${email}`).send({ password });

        const response = await request.post('/loginPsy').send({ email, password });
        expect(response.status).toBe(200);
    });

    it('should fail to login an psychologist', async () => {
        const response2 = await request.post('/loginPsy').send({});
        expect(response2.status).toBe(404);

        const errResponse = await request.post('/loginPsy').send(null);
        expect(errResponse.status).toBe(404);
    });
});
