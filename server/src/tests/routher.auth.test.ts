import routerAuth from "../routes/router.auth";
import request from 'supertest'

describe('POST /create-account', () => {
    test("should create an account", () => {
        const response = await request(routerAuth).post('/create-account').send()
        console.log(response)
    })
})