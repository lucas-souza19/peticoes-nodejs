console.log('[server.js] Iniciando a configuração do servidor');
const express = require('express');
const serverSession = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(serverSession({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Servidor rodando na porta: ', port);
});

module.exports = app;