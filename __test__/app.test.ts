const request = require('supertest');
const { app }  = require("../src/app");

describe('Test the root path', () => {
  test('It should response the GET method', async (done) => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    done();
  });
});

describe('GET /random-url', () => {
  test('should return 404', async () => {
    const response = await request(app).get('/reset');
    expect(response.statusCode).toBe(404);
  })
});
