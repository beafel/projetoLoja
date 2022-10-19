//Importacoes / Referencias as Bibliotecas
const supertest = require("supertest");
const assert = require("chai").assert;

// id do pet - um dos resultados esperados
const petId = 31;

describe('Petstore Swagger - Pet', () => {
    // Definir o camnho do servico / API - Base URL
    const request = supertest('https://petstore.swagger.io/v2');

    //Funcao POST == Create == Incluir
    it('POST Pet', () => {
        // Onde esta o json com os dados do Pet
        // Configura
        const jsonFile = require('../../vendors/petPost.json');
        return request                  // chamada para a requisicao
            .post('/pet')               // endpoint / funcao chamada
            // Executa
            .send(jsonFile)             // body / corpo da requisicao
            // Valida
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);            // comunicacao OK
                assert.equal(resposta.body.id, petId);             // valida o id do pet
                assert.equal(resposta.body.name, "Guga");          // valida nome do pet
                assert.equal(resposta.body.status, "available");   // valida o status do pet
            })
    }); // Final do POST

    // Funcao GET == Read / Reach / Research == Consultar
    it('GET Pet', () => {
        return request
            .get('/pet/' + petId)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.id, petId);
                assert.equal(resposta.body.name, "Guga");
                assert.equal(resposta.body.status, "available");
            })
    }); // Final do GET

    // Funcao PUT == Update == Alterar
    it('PUT Pet', () => {
        const jsonFile = require('../../vendors/petPut.json');
        return request
            .put('/pet')
            .send(jsonFile)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.id, petId);
                assert.equal(resposta.body.name, "Guga");
                assert.equal(resposta.body.status, "solded");
            })

    });

    // Funcao DELETE == Deletar
    it('DELETE Pet', () => {
        return request
            .delete('/pet/' + petId)
            .then((resposta) => {
                assert.equal(resposta.statusCode, 200);
                assert.equal(resposta.body.code, 200);
                assert.equal(resposta.body.type, "unknown");
                assert.equal(resposta.body.message, petId);
            })
    }) // Final do DELETE

})