const PeticoesController = require('../controllers/peticoesController');
const AuthController = require('../controllers/authController');

module.exports = {
    getPeticao: (app) => {
        app.get('/api/peticao', PeticoesController.getPeticao);
    },
    getPeticoes: (app) => {
        app.get('/api/peticoes', PeticoesController.getPeticoes);
    },
    addPeticao: (app) => {
        app.post('/api/incluir/peticao', PeticoesController.addPeticao);
    },
    authUser: (app) => {
        app.get('/api/authUser', AuthController.getUser);
    },
    deletePeticao: (app) => {
        app.get('/api/deletar/peticao', PeticoesController.deletePeticao);
    },
    updatePeticao: (app) => {
        app.get('/api/atualizar/peticao', PeticoesController.updatePeticao);
    },
    assinarPeticao: (app) => {
        app.get('/api/assinar/peticao', PeticoesController.assinarPeticao);
    },
}