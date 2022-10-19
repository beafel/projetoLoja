//Importacoes / Referencias as Bibliotecas
const supertest = require("supertest");
//const assert = require("chai").assert;
const { assert } = require("chai");

const userId = 101010;
const username = "Bea";
let token = "";

// Classe - opcional
describe('Petstore Swagger - User', () => {
    // Definir o camnho do servico / API - Base URL
    const request = supertest('https://petstore.swagger.io/v2');

    // Adicionar Usuario
    it('POST User', () => {
        const jsonFile = require('../../vendors/userPost.json')
        return request
            .post('/user')
            .send(jsonFile)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.code, 200);
                assert.equal(resposta.body.type, "unknown");
                assert.equal(resposta.body.message, userId)
            });
    })
    //Consultar Usuario
    it('GET User', () => {
        return request
            .get('/user/' + username)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.id, userId);
                assert.equal(resposta.body.password, "123456");
                assert.equal(resposta.body.phone, "3112345678")
            });

    })
    // Alterar Usuario
    it('PUT User', () => {
        const jsonFile = require('../../vendors/userPut.json')
        return request
            .put('/user/' + username)
            .send(jsonFile)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.code, 200);
                assert.equal(resposta.body.type, "unknown");
                assert.equal(resposta.body.message, userId)
            });
    })
    // Deletar Usuario
    /*
    it('DELETE User', () => {
        return request
            .delete('/user/' + username)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
            });
    }) 
    */

    // Login com Extração do token
    it('LOGIN Com Extracao', () => {
        const username = "Gabi";
        const password = "654321";

        return request
            .get("/user/login?username=" + username + "&password=" + password)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                token = resposta.body.message.substring(23);
                console.log("Token: " + token);
            });

    })
})    