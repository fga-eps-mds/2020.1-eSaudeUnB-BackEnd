const mongoose = require('mongoose');
const supertest = require('supertest');
const Psychologist = require('../models/Psychologist');
const UserPatient = require('../models/UserPatient');
const WaitingList = require('../models/WaitingList');
const WaitinglistemailUtil = require('../config/Waitinglist_email');

const app = require('../server');

const request = supertest(app);

const patient = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061999999999',
    password: 'password',
    unbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
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
        await request.post('/admin').send(admin);
        jest.spyOn(WaitinglistemailUtil, 'waitinglist').mockImplementation(() => true);
    });

    beforeEach(async () => {
        await Psychologist.collection.deleteMany({});
        await UserPatient.collection.deleteMany({});
        await WaitingList.collection.deleteMany({});
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should be able to create a waiting list', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        const response = await request.post('/waitingList').send({ emailPatient: patient.email, patientScore: 100 }).set('authorization', TokenAdmin);

        expect(response.status).toBe(201);
    });

    it('should not be able to create a waiting list', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        const response = await request.post('/waitingList').send({ emailPatient: null, patientScore: 100 }).set('authorization', TokenAdmin);

        expect(response.status).toBe(400);
    });

    it('should be able to list a psychologist waiting list', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/waitingList').send({ emailPatient: patient.email, npatientScore: 100 }).set('authorization', TokenAdmin);
        const response = await request.get('/waitingList').set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });
    it('should be not able to list a psychologist waiting list', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/waitingList').send({ emailPatient: patient.email, npatientScore: 100 }).set('authorization', TokenAdmin);
        jest.spyOn(WaitingList, 'find').mockImplementation(() => { throw new Error(); });
        const response = await request.get('/waitingList').set('authorization', TokenAdmin);

        expect(response.status).toBe(400);
    });

    it('should be able to destroy a waiting list', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/waitingList').send({ emailPatient: patient.email, patientScore: 100 }).set('authorization', TokenAdmin);
        const response = await request.delete(`/waitingList/${patient.email}`).set('authorization', TokenAdmin);

        expect(response.status).toBe(200);
    });
    it('should be not able to destroy a waiting list,throw error', async () => {
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/waitingList').send({ emailPatient: patient.email, patientScore: 100 }).set('authorization', TokenAdmin);
        jest.spyOn(WaitingList, 'deleteOne').mockImplementationOnce(() => { throw new Error(); });
        const response = await request.delete(`/waitingList/${patient.email}`).set('authorization', TokenAdmin);

        expect(response.status).toBe(400);
    });
});
