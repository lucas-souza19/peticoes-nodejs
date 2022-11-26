const client = require('../../config/dbConnection');

module.exports = class PeticoesModel {
    static async getUser(username) {
        const auth = await client.db("dsw").collection("users").findOne({
            username: username
        });

        return auth;
    }
}