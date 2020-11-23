const mongoose = require('mongoose');
const supertest = require('supertest');

const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const app = require('../server');

const request = supertest(app);

const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

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

        const response = await request.post('/login/patient').send({ email, password });
        expect(response.status).toBe(200);
    });

    it('should fail to login an user', async () => {
        const response2 = await request.post('/login/patient').send({});
        expect(response2.status).toBe(404);

        const errResponse = await request.post('/login/patient').send(null);
        expect(errResponse.status).toBe(404);
    });

    it('should be able to succssessfully login an psychologist', async () => {
        await request.post('/admin').send(admin);
        const emailAdmin = admin.email;
        const passwordAdmin = admin.password;
        const respose = await request.post('/admin/login').send({ email: emailAdmin, password: passwordAdmin });
        const TokenAdmin = respose.body.accessToken;

        await request.post('/psychologist').set('authorization', TokenAdmin).send(psyUser);
        const psy = await request.get(`/psychologist/${psyUser.email}`).set('authorization', TokenAdmin);

        const response = await request.post('/login/psychologist').send({ email: psy.body.email, password: psy.body.password });
        expect(response.status).toBe(200);
    });

    it('should fail to login an psychologist', async () => {
        const response2 = await request.post('/login/psychologist').send({});
        expect(response2.status).toBe(404);

        const errResponse = await request.post('/login/psychologist').send(null);
        expect(errResponse.status).toBe(404);
    });
});
