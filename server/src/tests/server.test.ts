import request from 'supertest'
import server from "../server";

describe('GET /test', () => {
    test("should create an account", async () => {
        const response = await request(server).get('/api/auth/test').send();
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /new-user', () => {
    test("should test if the new user is alredy singed", async () => {
        const response = await request(server).post('/api/asist/new-user').send({    
            "email": "testmail@gmail.com",
            "name": "Juan"
        });
        expect(response.statusCode).toBe(200);
    });
});


describe('POST /create-account', () => {
    test("should create an account", async () => {
        const response = await request(server).post('/api/auth/create-account').send({    
            "name": "Juan",
            "password": "password",
            "password_confirmation": "password",
            "email": "testmail@gmail.com"
        });
        expect(response.text).toBe("Cuenta creada, revisa tu email para confirmarla");
    });
});

describe('POST /request-code', () => {
    test("should remail you a new validation token", async () => {
        const response = await request(server).post('/api/auth/request-code').send({    
            "email": "testmail@gmail.com",
        });
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /confirm-account', () => {
    test("should confirm an account with a token", async () => {
        const token = await request(server).post('/api/auth/test-token').send({    
            "email": "testmail@gmail.com"
        });
        const response = await request(server).post('/api/auth/confirm-account').send({    
            "token": token.body
        });
        expect(response.body).toEqual({ message: "Cuenta Confirmada" });
    });
});

describe('POST /forgot-password', () => {
    test("should email you a recuparation for your password", async () => {
        const response = await request(server).post('/api/auth/forgot-password').send({    
            "email": "testmail@gmail.com",
        });
        expect(response.statusCode).toBe(200);
    });
});

describe('POST /validate-token', () => {
    test("should confirm a recuperation of a password from an account with a token", async () => {
        const token = await request(server).post('/api/auth/test-token').send({    
            "email": "testmail@gmail.com"
        });
        const response = await request(server).post('/api/auth/validate-token').send({    
            "token": token.body
        });
        expect(response.body).toEqual({ message: "Token Valido, Define tu nuevo password" });
    });
});

describe('POST /update-password/:token', () => {
    test("should change the register of an account", async () => {
        const token = await request(server).post('/api/auth/test-token').send({    
            "email": "testmail@gmail.com"
        });
        const response = await request(server).post(`/api/auth/update-password/${token.body}`).send({    
            "name": "Juan",
            "password": "password",
            "password_confirmation": "password"
        });
        expect(response.body).toEqual({ message: "Contrasena cambiada correctamente" });
    });
});

describe('POST /login', () => {
    test("should login an account", async () => {
        const response = await request(server).post('/api/auth/login').send({    
            "email": "testmail@gmail.com",
            "password": "password"
        });
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /users', () => {
    test("should login an account", async () => {
        const response = await request(server).get('/api/asist/users').send({});
        expect(response.statusCode).toBe(200);
    });
});


describe('DELETE /test-cleanup', () => {
    test("should delete an account created for the test", async () => {
        const response = await request(server).delete('/api/auth/test-cleanup').send({    
        "email": "testmail@gmail.com"
    });
    expect(response.statusCode).toBe(200);
    });
});

