const client = require('../../config/dbConnection')
const {
    ObjectId
} = require('mongodb');

module.exports = class PeticoesModel {
    static async getPeticao(id) {
        const peticao = await client.db("dsw").collection("peticoes").findOne({
            _id: new ObjectId(id)
        });

        return peticao;
    }

    static async getAssinatura() {
        const cursor = await client.db("dsw").collection("assinaturas").find();
        const peticoes = await cursor.toArray();

        console.log(peticoes)
        return peticoes;
    }

    static async deletePeticao(id) {
        console.log(`[deletepeticao]`, id);
        const peticao = await client.db("dsw").collection("peticoes").deleteOne({
            _id: new ObjectId(id)
        });
        return peticao;
    }

    static async updatePeticao(id, data) {
        const updatePeticao = {
            titulo: data.titulo,
            descricao: data.descricao,
            criador: data.criador,
            data: new Date(),
            meta: data.meta,
            qtd_assinaturas: data.qtd_assinaturas
        }

        const peticao = await client.db("dsw").collection("peticoes").updateOne({
            _id: new ObjectId(id)
        }, {
            $set: {
                titulo: updatePeticao.titulo,
                descricao: updatePeticao.descricao,
                criador: updatePeticao.criador,
                data: updatePeticao.data,
                meta: updatePeticao.meta,
                qtd_assinaturas: updatePeticao.qtd_assinaturas
            }
        });

        console.log(`Petição atualizada com id: ${id}`);

        return peticao;
    }

    static async getPeticoes() {
        const cursor = await client.db("dsw").collection("peticoes").find();
        const peticoes = await cursor.toArray();
        return peticoes;
    }

    static async addPeticao(data) {
        try {
            const newPeticao = {
                titulo: data.titulo,
                descricao: data.descricao,
                criador: data.criador,
                data: new Date(),
                meta: data.meta,
                qtd_assinaturas: data.qtd_assinaturas
            }
            const addedPeticao = await client.db("dsw").collection("peticoes").insertOne(newPeticao);

            console.log(`Petição cadastrada com id: ${addedPeticao.insertedId}`);

            return addedPeticao;
        } catch (error) {
            console.log(`[peticoeservice] Error: ${error}`);
        }
    }

    static async assinarPeticao(data) {
        console.log(`[Peticao Model - Assinar Peticao] ${data}`);
        try {
            const newPeticao = {
                id_peticao: data.id_peticao,
                token_user: data.token_user,
                username: data.username
            }
            const addedPeticao = await client.db("dsw").collection("assinaturas").insertOne(newPeticao);
            console.log(`Petição assinada com id: ${addedPeticao.insertedId}`);
            return addedPeticao;
        } catch (error) {
            console.log(`[peticoeservice] Error: ${error}`);
        }
    }
}