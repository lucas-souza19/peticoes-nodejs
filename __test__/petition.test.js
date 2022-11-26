const supertest = require('supertest');
const app = require('../index.js');

describe('peticao', () => {
    describe("Rotas petições", () => {
        describe('Obter todas as petições', () => {
            it("Deve retornar o status 200", async () => {
                await supertest(app)
                    .get(`/api/peticoes`)
                    .expect(200);
            })
        });

        describe('Obter petição inexistente', () => {
            it("Deve retornar o status 404", async () => {
                await supertest(app)
                    .get(`/api/peticao/teste_erro`)
                    .expect(404);
            })
        });

        describe('Adicionar peticao', () => {
            it("Deve retornar o status 200", async () => {
                await supertest(app)
                    .post(`/api/incluir/peticoes`)
                    .set('Content-Type', 'application/json')
                    .query({
                        titulo: 'teste peticao',
                        descricao: 'teste peticao',
                        criador: 'teste peticao',
                        meta: 10,
                        qtd_assinaturas: 0,
                    })
                    .expect(200);
            })
        });

        describe('Adicionar petição ERROR', () => {
            it("Deve retornar o status 404 ERROR INSERT", async () => {
                await supertest(app)
                    .post(`/api/incluir/peticoes`)
                    .set('Content-Type', 'application/json')
                    .query({
                        titulo: ''
                    })
                    .expect(404);
            })
        });

        describe('Atualizar peticao', () => {
            it("Deve retornar o status 200", async () => {
                await supertest(app)
                    .get(`/api/atualizar/peticao`)
                    .set('Content-Type', 'application/json')
                    .query({
                        titulo: 'teste peticao update',
                        descricao: 'teste peticao update',
                        meta: 10,
                        qtd_assinaturas: 2,
                        _id: '636993580940c23c6f69d2dd'
                    })
                    .expect(200);
            })
        });

        describe('Update petição ERROR', () => {
            it("Deve retornar o status 404 ERROR UPDATE", async () => {
                await supertest(app)
                    .get(`/api/atualizar/peticao`)
                    .set('Content-Type', 'application/json')
                    .query({
                        _id: 'id_invalido',
                        titulo: 'teste peticao UPDATE',
                        descricao: 'teste peticao UPDATE'
                    })
                    .expect(500);
            })
        });

        describe('Delete petição ERROR', () => {
            it("Deve retornar o status 500 ERROR DELETE", async () => {
                await supertest(app)
                    .get(`/api/deletar/peticao`)
                    .query({
                        _id: 'id_invalido'
                    })
                    .expect(500);
            })
        });

        describe('Delete petição', () => {
            it("Deve retornar o status 200", async () => {
                await supertest(app)
                    .get(`/api/deletar/peticao`)
                    .query({
                        _id: '636f018d9fa3ddc27caf40e1'
                    })
                    .expect(200);
            })
        });

        describe('Efetuar Login', () => {
            it("Deve retornar o status 200", async () => {

                await supertest(app)
                    .get(`/api/authUser`)
                    .set('Content-Type', 'application/json')
                    .query({
                        username: "teste",
                        password: "123456"
                    })
                    .expect(200);
            })
        });

        describe('Não existe este usuário', () => {
            it("Deve retornar o status 401", async () => {
                await supertest(app)
                    .get(`/api/authUser`)
                    .set('Content-Type', 'application/json')
                    .query({
                        email: "nao_existe",
                        password: "123456"
                    })
                    .expect(401);
            })
        });
    })
});