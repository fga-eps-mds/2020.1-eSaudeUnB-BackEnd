// const supertest = require('supertest');
// const app = require('../server');

// const request = supertest(app);

// const user1 = {
//     name: 'Vinicius',
//     lastName: 'Lima',
//     email: 'viniciusfa.delima@gmail.com',
//     phone: '061999999999',
//     password: 'password',
//     unbunbRegistration: '180000000',
//     gender: 'M',
//     bond: 'graduando',
// };

// const user2 = {
//     name: 'Rafael',
//     lastName: 'Leão',
//     email: 'rafaelltm10@hotmail.com',
//     phone: '061988888888',
//     password: 'password',
//     unbRegistration: '180000001',
//     gender: 'M',
//     bond: 'graduando',
// };

// describe('Patient API', () => {
//     afterAll(async (done) => {
//         await db.sequelize.close();
//         done();
//     });

//     it('should be able to return a user', async () => {
//         await request.post('/users').send(user1);

//         const response = await request.get('/users');

//         expect(response.status).toBe(200);
//     });

//     it('should be able to list all the users', async () => {
//         await request.post('/users').send(user1);
//         await request.post('/users').send(user2);

//         const response = await request.get('/users');

//         expect(response.status).toBe(200);
//     });

//     it('should be able to create a new user', async () => {
//         const response = await request.post('/users').send({
//             name: 'Rafael',
//             lastName: null,
//             email: 'rafaelltm10@hotmail.com',
//             phone: '061988888888',
//             password: 'password',
//             unbRegistration: '180000001',
//             gender: 'M',
//             bond: 'graduando',
//         });

//         expect(response.status).toBe(401);

//         const response2 = await request.post('/users').send(user2);

//         expect(response2.status).toBe(201);
//     });

//     it('should be able to delete a user', async () => {
//         await request.post('/users').send(user1);

//         const response = await request.get('/users');
//         const { id } = response.body[0];

//         const responseDelete = await request.delete(`/users/${id}`);

//         expect(responseDelete.status).toBe(200);
//     });

//     it('should be able to update a user', async () => {
//         await request.post('/users').send(user1);

//         const response = await request.get('/users');
//         const { id } = response.body[0];

//         const response2 = await request.put(`/users/${id}`).send(user2);

//         const users1 = await request.get('/users');
//         const { name } = JSON.parse(users1.text)[0];

//         expect(name).toBe('Rafael');
//         expect(response2.status).toBe(200);
//     });
// });
