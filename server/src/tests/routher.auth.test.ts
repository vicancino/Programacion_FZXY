import request from 'supertest'
import server from "../server";

describe('GET /test', () => {
    test("should create an account", async () => {
        const response = await request(server).post('/api/auth/test').send();
        expect(response.statusCode).toBe(200);
    })
})