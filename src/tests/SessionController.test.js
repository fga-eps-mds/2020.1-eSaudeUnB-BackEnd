const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../server');

const request = supertest(app);

const session = {
    email: 'email@email.com',
    mainComplaint: 'testing api',
    secondaryComplaint: 'testing api',
    complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos. ',
    professional: 'Pedro Henrique',
};

const user = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'email@email.com',
    phone: '061999999999',
    password: 'password',
    unbunbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
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

    afterAll(async (done) => {
        await mongoose.connection.close();
        done();
    });

    it('should be able to register a new session', async () => {
        const response = await request.post('/session').send(session);

        expect(response.status).toBe(201);

        await request.post('/users').send(user);
        const response2 = await request.post('/session').send(session);

        expect(response2.status).toBe(201);
    });

    it('should be able to list all sessions', async () => {
        const responseError = await request.get('/session/all/test@email.com');

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session);

        const response = await request.get('/session/all/email@email.com');

        expect(response.status).toBe(200);
    });

    it('should be able to list 4 sessions', async () => {
        const responseError = await request.get('/session/test@email.com');

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session);

        const response = await request.get('/session/email@email.com');

        expect(response.status).toBe(200);
    });

    it('should be able to update a session', async () => {
        await request.post('/users').send(user);
        await request.post('/session').send(session);

        const response = await request.put('/session').send({
            mainComplaint: 'Teste update',
            secondaryComplaint: 'Update teste',
            complaintEvolution: 'Fallaste ia es mettidas eu da conheces effeitos. Tal tao bolota resume orphao com recusa fez. Ou recebaes corajoso tu incrivel sr. Nao paciencia vol illuminou allumiada tao dolorosas. Si antipathia amorteciam es do defendemos imaginacao. Pes joias paz sabor fatia luzes pegue todos. Apreciar nas relacoes lei sou sou interior confusao preparou julgaria. Tudo faz leis quem vae sois era meu. ',
            professional: 'Vinicius',
        });

        expect(response.status).toBe(400);
    });

    it('should be able to delete a session', async () => {
        const responseError = await request.delete('/session/test@email.com');

        expect(responseError.status).toBe(404);

        await request.post('/users').send(user);
        await request.post('/session').send(session);
        const response = await request.delete('/session/email@email.com');

        expect(response.status).toBe(200);
    });
});
