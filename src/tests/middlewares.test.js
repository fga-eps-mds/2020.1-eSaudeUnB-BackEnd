const mongoose = require('mongoose');
const supertest = require('supertest');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const app = require('../server');
const UserPatient = require('../models/UserPatient');
const PatientEmail = require('../config/Patient_email');
const Psychologist = require('../models/Psychologist');
const PsychologistEmail = require('../config/Psychologist_email');

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

const psy1 = {
    name: 'Rafael',
    lastName: 'Leão',
    email: 'email2@email.com',
    phone: '061988888888',
    gender: 'M',
    bond: 'Psicologo',
    specialization: 'Psicólogo',
};
const psy2 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061988888888',
    password: 'teste12345678',
    gender: 'M',
    bond: 'Psicologo',
    specialization: 'Psicólogo',
    biography: '',
};

const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

describe('Middlewares API', () => {
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
        await request.post('/admin').send(admin);
        jest.spyOn(PsychologistEmail, 'PsyEmail').mockImplementation(() => true);
        jest.spyOn(nodemailer, 'createTransport').mockImplementation(() => true);
        jest.spyOn(PatientEmail, 'PatientEmail').mockImplementation(() => true);
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should able fail no token provided', async () => {
        const Token = '';

        const response = await request.get('/users').send(user1).set('authorization', Token);

        expect(response.status).toBe(401);
    });

    it('should able fail incorrect token', async () => {
        const Token = 'ola mundo';

        const response = await request.get('/users').send(user1).set('authorization', Token);

        expect(response.status).toBe(401);
    });

    it('should able fail with corect user token to admin fuction', async () => {
        await request.post('/users').send(user1);
        const { email, password } = user1;
        const respose = await request.post('/login/patient').send({ email, password });
        const Token = respose.body.accessToken;

        const response = await request.post('/psychologist').send(psy1).set('authorization', Token);
        expect(response.status).toBe(401);
    });
    it('should able fail with corect Psychologist token to admin fuction', async () => {
        const respose = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose.body.accessToken;
        await request.post('/psychologist').send(psy1).set('authorization', TokenAdmin);

        const psy = await request.get(`/psychologist/${psy1.email}`).set('authorization', TokenAdmin);
        const PsyLogin = await request.post('/login/psychologist').send({ email: psy.body.email, password: psy.body.password });
        const PsyToken = PsyLogin.body.accessToken;

        const response = await request.post('/psychologist').send(psy2).set('authorization', PsyToken);

        expect(response.status).toBe(401);
    });
    it('should able fail with corect user token to user fuction', async () => {
        await request.post('/users').send(user1);
        const respose = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose.body.accessToken;

        const response = await request.put(`/user/${user1.email}`).send({
            name: 'Vinicius',
            lastName: 'Lima',
            email: 'email@email.com',
            mainComplaint: 'Uso de drogas',
        }).set('authorization', TokenAdmin);

        expect(response.status).toBe(401);
    });
    it('should able fail with corect admin token to psychologist fuction', async () => {
        const respose = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose.body.accessToken;

        const response = await request.put('/session').send({
            date: '2020-2-5',
            email: 'email@email.com',
            secondaryComplaint: 'teste 4',
            professional: 'Pedro Henrique',
        }).set('authorization', TokenAdmin);

        expect(response.status).toBe(401);
    });
    it('should be able to succssessfully token to admin fuction', async () => {
        const respose = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose.body.accessToken;
        const response = await request.post('/psychologist').send(psy1).set('authorization', TokenAdmin);

        expect(response.status).toBe(201);
    });
    it('should be able not to succssessfully token to admin fuction, trow error', async () => {
        await request.post('/users').send(user1);
        const { email, password } = user1;
        const respose = await request.post('/login/patient').send({ email, password });
        const Token = respose.body.accessToken;
        jest.spyOn(UserPatient, 'findOne').mockImplementationOnce(() => { throw new Error(); });
        const response = await request.post('/psychologist').send(psy1).set('authorization', Token);
        expect(response.status).toBe(401);
    });
    it('should be able not to succssessfully token to user fuction, trow error', async () => {
        await request.post('/users').send(user1);
        const respose1 = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose1.body.accessToken;
        jest.spyOn(UserPatient, 'findOne').mockImplementationOnce(() => { Error(); });
        const response = await request.put(`/user/${user1.email}`).send({
            name: 'Vinicius',
            lastName: 'Lima',
            email: 'email@email.com',
            mainComplaint: 'Uso de drogas',
        }).set('authorization', TokenAdmin);

        expect(response.status).toBe(401);
    });
    it('should be able not to succssessfully token to psychologist fuction, trow error', async () => {
        const respose1 = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose1.body.accessToken;
        jest.spyOn(UserPatient, 'findOne').mockImplementationOnce(() => { Error(); });
        const response = await request.put('/session').send({
            date: '2020-2-5',
            email: 'email@email.com',
            secondaryComplaint: 'teste 4',
            professional: 'Pedro Henrique',
        }).set('authorization', TokenAdmin);
        expect(response.status).toBe(401);
    });
    it('should be able fail token ,throw return', async () => {
        const respose = await request.post('/admin/login').send({
            email: admin.email, password: admin.password,
        });
        const TokenAdmin = respose.body.accessToken;
        jest.spyOn(jwt, 'verify').mockImplementation(() => { throw new Error(); });
        const response = await request.post('/psychologist').send(psy1).set('authorization', TokenAdmin);

        expect(response.status).toBe(401);
    });
});
