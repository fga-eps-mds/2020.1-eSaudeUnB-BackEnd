const supertest = require('supertest');
const app = require('../server');
const models = require('../models');
const UserPatient = models.Patient;

const request = supertest(app);

describe('Patient', () => {

    beforeEach(() =>{
       return UserPatient.sync({force: true});
    });

    afterAll(() =>{
        return UserPatient.drop();
    });

    it('should be able to return a user', async (done) =>{
        const user = await request.post("/users").send({
            name: "Vinicius",
            surname: "Lima",
            email: "viniciusfa.delima@gmail.com",
            phoneNumber: "061999999999",
            password: "password",
            registration: "180000000",
            gender: "M",
            link: "graduando",
        });

        const users = await request.get('/users');
        const id = JSON.parse(users.text)[0]._id;

        const response = await request.get(`/users/${id}`);

        expect(response.status).toBe(200);
        done();

    });

    it('should be able to list all the users', async(done) => {
        await request.post("/users").send({
            name: "Vinicius",
            surname: "Lima",
            email: "viniciusfa.delima@gmail.com",
            phoneNumber: "061999999999",
            password: "password",
            registration: "180000000",
            gender: "M",
            link: "graduando",
        });

        await request.post("/users").send({
            name: "Rafael",
            surname: "Leão",
            email: "rafaelltm10@hotmail.com",
            phoneNumber: "061988888888",
            password: "password",
            registration: "180000001",
            gender: "M",
            link: "graduando",
        });

        const response = await request.get('/users');

        expect(JSON.parse(response.text).length).toBe(2);
        expect(response.status).toBe(200);
        done();
    });

    it("should be able to create a new user", async(done) => {
        const response = await request.post("/users").send({
             name: "Rafael",
             surname: null,
             email: "rafaelltm10@hotmail.com",
             phoneNumber: "061988888888",
             password: "password",
             registration: "180000001",
             gender: "M",
             link: "graduando",
         });

        expect(response.status).toBe(401);

        const response2 = await request.post("/users").send({
            name: "Rafael",
            surname: "Leão",
            email: "rafaelltm10@hotmail.com",
            phoneNumber: "061988888888",
            password: "password",
            registration: "180000001",
            gender: "M",
            link: "graduando",
        });

        const responseGet = await request.get("/users");
        
        expect(response2.status).toBe(200);
        expect(JSON.parse(responseGet.text).length).toBe(1);

        done();
    });

    it("should be able to delete a user", async(done) => {
        await request.post("/users").send({
            name: "Vinicius",
            surname: "Lima",
            email: "viniciusfa.delima@gmail.com",
            phoneNumber: "061999999999",
            password: "password",
            registration: "180000000",
            gender: "M",
            link: "graduando",
        });

        const users = await request.get('/users');
        const id = JSON.parse(users.text)[0]._id;

        const responseDelete = await request.delete(`/users/${id}`);

        const response = await request.get('/users');

        expect(responseDelete.status).toBe(200);
        expect(JSON.parse(response.text).length).toBe(0);
        done();
    });

    it("should be able to update a user", async(done) => {
        const user = await request.post("/users").send({
            name: "Vinicius",
            surname: "Lima",
            email: "viniciusfa.delima@gmail.com",
            phoneNumber: "061999999999",
            password: "password",
            registration: "180000000",
            gender: "M",
            link: "graduando",
        });

        const users = await request.get('/users');
        const id = JSON.parse(users.text)[0]._id;
        
        const response = await request.put(`/users/${id}`).send({
            name: "Rafael",
            surname: "Leão",
            email: "rafaelltm10@hotmail.com",
            phoneNumber: "061988888888",
            password: "password",
            registration: "180000001",
            gender: "M",
            link: "graduando"
        });

        const users1 = await request.get('/users');
        const name = JSON.parse(users1.text)[0].name;

        expect(name).toBe('Rafael');
        expect(response.status).toBe(200);
        done();
    });
});


//  it('gets the test endpoint', async (done) => {
//      const response = await request.get('/user');

//      expect(response.status).toBe(200);
//      expect(response.body.message).toBe('Hello World');
//      done();
// });
