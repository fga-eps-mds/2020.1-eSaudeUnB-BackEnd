const mongoose = require('mongoose');
const supertest = require('supertest');
const nodemailer = require('nodemailer');
const Session = require('../models/Session');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');
const PsychologistEmail = require('../config/Psychologist_email');
const PatientEmail = require('../config/Patient_email');
const ForgertPassword = require('../config/ForgetPassword_email');

const app = require('../server');

const request = supertest(app);

const session = {
    email: 'email@email.com',
    mainComplaint: 'testing api',
    secondaryComplaint: 'testing api',
    complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos.',
    professional: 'Pedro Henrique',
    date: '2020-2-20',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061981353485',
    password: '123456789',
    unbRegistration: '190019158',
    gender: 'M',
    bond: 'graduando',
};

const user2 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email2@email2.com',
    phone: '061981353485',
    password: '123456789',
    unbRegistration: '190019158',
    gender: 'M',
    bond: 'graduando',
};

const psyUser = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'emailPsy@email.com',
    phone: '061999999999',
    gender: 'M',
    bond: 'Psicologo',
    specialization: 'psicologo',
    biography: '',
};
const admin = {
    name: 'Vinicius',
    email: 'vinicius@unb.br',
    password: 'password',
};

describe('Session API', () => {
    beforeAll(async () => {
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        jest.spyOn(PsychologistEmail, 'PsyEmail').mockImplementation(() => true);
        jest.spyOn(nodemailer, 'createTransport').mockImplementation(() => true);
        jest.spyOn(PatientEmail, 'PatientEmail').mockImplementation(() => true);
        jest.spyOn(ForgertPassword, 'Fgetpassword').mockImplementation(() => true);
    });

    beforeEach(async () => {
        await UserPatient.collection.deleteMany({});
        await Session.collection.deleteMany({});
        await Psychologist.collection.deleteMany({});
        await request.post('/admin').send(admin);
        const resposit = await request.post('/admin/login').send({ email: admin.email, password: admin.password });
        const TokenAdmin = resposit.body.accessToken;
        await request.post('/psychologist').send(psyUser).set('authorization', TokenAdmin);
        const psy = await request.get(`/psychologist/${psyUser.email}`).set('authorization', TokenAdmin);
        await request.put(`/psyUpdatePassword/${psyUser.email}`).send({ oldPassword: psy.body.password, password: '123456789' }).set('authorization', TokenAdmin);
    });

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should not be able to register a new session', async () => {
        await request.post('/users').send(user2);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const errResponse = await request.post('/session')
            .send({
                date: '2020-2-5',
                email: 'email2@email2.com',
                secondaryComplaint: 'teste 4',
                professional: 'Pedro Henrique',
            }).set('authorization', TokenPsy);
        expect(errResponse.status).toBe(400);

        const response = await request.post('/session').send(session).set('authorization', TokenPsy);
        expect(response.status).toBe(404);
    });
    it('should be able to register a new session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const response = await request.post('/session').send(session).set('authorization', TokenPsy);
        expect(response.status).toBe(201);
    });

    it('should not be able to register a new session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const response = await request.post('/session').send({
            email: 'email@email.com',
            mainComplaint: 'testing api',
            secondaryComplaint: 'testing api',
            complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos.',
            professional: 'Pedro Henrique',
            date: null,
        }).set('authorization', TokenPsy);
        expect(response.status).toBe(404);
    });
    it('should not be able to list all sessions', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const responseError = await request.get('/sessions/test@email.com').set('authorization', TokenPsy);

        expect(responseError.status).toBe(404);
    });
    it('should be able to list all sessions', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);

        const response = await request.get(`/sessions/${user.email}`).set('authorization', TokenPsy);

        expect(response.status).toBe(200);
    });
    it('should not be able to list all sessions', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);
        jest.spyOn(UserPatient, 'findOne').mockImplementationOnce(() => { throw new Error(); });
        const response = await request.get(`/sessions/${user.email}`).set('authorization', TokenPsy);

        expect(response.status).toBe(400);
    });
    it('should not be able to list a session', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);
        jest.spyOn(UserPatient, 'findOne').mockImplementationOnce(() => { throw new Error(); });
        const response = await request.get(`/session/${user.email}`).set('authorization', TokenPsy);

        expect(response.status).toBe(400);
    });

    it('should be able to list 4 sessions', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const responseError = await request.get('/session/test@email.com').set('authorization', TokenPsy);

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);

        const response = await request.get('/session/email@email.com').set('authorization', TokenPsy);

        expect(response.status).toBe(200);
    });

    it('should be able to delete a session', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const responseError = await request.delete('/session/test@email.com').set('authorization', TokenPsy);

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);
        const response = await request.delete('/session/email@email.com').set('authorization', TokenPsy);

        expect(response.status).toBe(200);
    });

    it('should not be able to delete a session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const respose = await request.post('/session').send(session).set('authorization', TokenPsy);
        const id = respose.body.sessions[0];
        jest.spyOn(Session, 'findById').mockImplementationOnce(() => { throw new Error(); });
        const responseError = await request.delete(`/session/${user.email}`).send({
            id,
        }).set('authorization', TokenPsy);

        expect(responseError.status).toBe(400);
    });
    it('should be able to update a session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const respose = await request.post('/session').send(session).set('authorization', TokenPsy);
        const id = respose.body.sessions[0];

        const response = await request.put('/session').send({
            id,
            mainComplaint: ' update',
            secondaryComplaint: 'Update teste',
            complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos. Tal tao bolota resume orphao com recusa fez. Ou recebaes corajoso tu incrivel sr. Nao paciencia vol illuminou allumiada tao dolorosas. Si antipathia amorteciam es do defendemos imaginacao. Pes joias paz sabor fatia luzes pegue todos. Apreciar nas relacoes lei sou sou interior confusao preparou julgaria. Tudo faz leis quem vae sois era meu. ',
            professional: 'Hilmer',
            date: '2020-2-20',
        }).set('authorization', TokenPsy);
        expect(response.status).toBe(200);
    });
    it('should not be able to update a session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;

        const respose = await request.post('/session').send(session).set('authorization', TokenPsy);
        const id = respose.body.sessions[0];
        jest.spyOn(Session, 'findOneAndUpdate').mockImplementationOnce(() => { throw new Error(); });
        const response = await request.put('/session').send({
            id,
            mainComplaint: ' update',
            secondaryComplaint: 'Update teste',
            complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos. Tal tao bolota resume orphao com recusa fez. Ou recebaes corajoso tu incrivel sr. Nao paciencia vol illuminou allumiada tao dolorosas. Si antipathia amorteciam es do defendemos imaginacao. Pes joias paz sabor fatia luzes pegue todos. Apreciar nas relacoes lei sou sou interior confusao preparou julgaria. Tudo faz leis quem vae sois era meu. ',
            professional: 'Hilmer',
            date: '2020-2-20',
        }).set('authorization', TokenPsy);
        expect(response.status).toBe(400);
    });
});
