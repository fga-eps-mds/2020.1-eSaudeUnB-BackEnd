const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../server');

const request = supertest(app);

const user1 = {
    name: 'Vinicius',
    lastName: 'Lima',
    email: 'viniciusfa.delima@gmail.com',
    phone: '061999999999',
    password: 'password',
    unbunbRegistration: '180000000',
    gender: 'M',
    bond: 'graduando',
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

const user3 = {
    name: 'Lucas',
    lastName: 'Henrique',
    email: 'lucasHenrique@hotmail.com',
    phone: '0619856482',
    password: 'teste',
    unbRegistration: '1098739',
    gender: 'M',
    bond: 'graduando',
    civilStatus: 'Solteiro',
    religion: 'Catolico',
};

const user4 = {
    name: 'Abner',
    lastName: 'Filipe',
    email: 'abner@hotmail.com',
    phone: '06187832902',
    password: 'abner',
    unbRegistration: '1900267842',
    gender: 'M',
    bond: 'graduando',
    civilStatus: 'Casado',
    religion: 'Evangelico',
};

describe('Patient API', () => {
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

    it('should be able to return a user', async () => {
        await request.post('/users').send(user1);

        const response = await request.get(`/user/${user1.email}`);

        expect(response.status).toBe(200);
    });

    it('should be able to list all the users', async () => {
        await request.post('/users').send(user1);
        await request.post('/users').send(user2);

        const response = await request.get('/users');

        expect(response.status).toBe(200);
    });

    it('should be able to create a new user', async () => {
        const response = await request.post('/users').send({
            name: 'Rafael',
            lastName: null,
            email: 'teste@hotmail.com',
            phone: '061988888888',
            password: 'password',
            unbRegistration: '180000001',
            gender: 'M',
            bond: 'graduando',
        });

        expect(response.status).toBe(400);
    });

    it('should be able to delete a user', async () => {
        await request.post('/users').send(user1);

        const responseDelete = await request.delete('/user').send({
            email: 'teste@hotmail.com',
        });

        expect(responseDelete.status).toBe(200);
    });

    it('should be able to update a user', async () => {
        await request.post('/users').send(user3);

        const response = await request
            .put(`/userUpdate/${user3.email}`)
            .send(user4);

        expect(response.status).toBe(200);
    });

    it('should be able to update a user password', async () => {
        await request.post('/users').send(user3);

        const response = await request
            .put(`/user/${user3.email}`)
            .send({ password: 'teste' });

        expect(response.status).toBe(200);
    });
});
