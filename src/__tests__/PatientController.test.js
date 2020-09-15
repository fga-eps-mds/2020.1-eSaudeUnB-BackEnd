const supertest = require('supertest');
const app = require('../server');

const request = supertest(app);

it('gets the test endpoint', async (done) => {
    const response = await request.get('/user');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World');
    done();
});
