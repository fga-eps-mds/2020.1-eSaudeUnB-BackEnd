const mongoose = require('mongoose');
const supertest = require('supertest');
const Session = require('../models/Session');
const UserPatient = require('../models/UserPatient');
const Psychologist = require('../models/Psychologist');

const app = require('../server');

const request = supertest(app);

const session = {
    email: 'email@email.com',
    mainComplaint: 'testing api',
    secondaryComplaint: 'testing api',
    complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos.',
    professional: 'Pedro Henrique',
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
    bond: 'Psychologist',
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

    it('should be able to list all sessions', async () => {
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        const responseError = await request.get('/sessions/test@email.com').set('authorization', TokenPsy);

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session).set('authorization', TokenPsy);

        const response = await request.get('/sessions/email@email.com').set('authorization', TokenPsy);

        expect(response.status).toBe(200);
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

    it('should be able to update a session', async () => {
        await request.post('/users').send(user);
        const response2 = await request.post('/login/psychologist').send({ email: psyUser.email, password: '123456789' });
        const TokenPsy = response2.body.accessToken;
        await request.post('/session').send(session).set('authorization', TokenPsy);
        const response = await request.put('/session').send({
            mainComplaint: 'Teste update',
            secondaryComplaint: 'Update teste',
            complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos. Tal tao bolota resume orphao com recusa fez. Ou recebaes corajoso tu incrivel sr. Nao paciencia vol illuminou allumiada tao dolorosas. Si antipathia amorteciam es do defendemos imaginacao. Pes joias paz sabor fatia luzes pegue todos. Apreciar nas relacoes lei sou sou interior confusao preparou julgaria. Tudo faz leis quem vae sois era meu. ',
            professional: 'Vinicius',
        }).set('authorization', TokenPsy);

        expect(response.status).toBe(400);
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
});
