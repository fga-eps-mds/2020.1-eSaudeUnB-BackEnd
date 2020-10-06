const mongoose = require('mongoose');
const supertest = require('supertest');

const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const app = require('../server');

const request = supertest(app);

const psyUser = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'emailPsy@email.com',
    phone: '061999999999',
    gender: 'M',
    bond: 'psychologist',
    specialization: 'psicologo',
    biography: '',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'emailUser@email.com',
    password: 'password',
    unbRegistration: '180000000',
    phone: '061999999999',
    gender: 'M',
    bond: 'graduando',
    religion: '',
    civilStatus: '',
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
        const psyResponse = await request.post('/admin/psy/create').send(psyUser);

        const { email, password } = psyResponse.body;

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
