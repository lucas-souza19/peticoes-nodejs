const app = require('./config/server');
const routes = require('./app/routes/routes');

routes.authUser(app);
routes.getPeticao(app);
routes.addPeticao(app);
routes.getPeticoes(app);
routes.deletePeticao(app);
routes.updatePeticao(app);
routes.assinarPeticao(app);

module.exports = app;

