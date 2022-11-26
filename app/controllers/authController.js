const AuthModel = require('../models/authModel');
const crypto = require('crypto');
const LocalStorage = require('node-localstorage').LocalStorage;
const logger = require('../../config/logger');

module.exports = class Auth {
  static async getUser(req, res, next) {
    try {
      const auth = await AuthModel.getUser(req.query.username);

      if (!auth) {
        res.status(401).json(`Não existe usuário cadastrado.`);

        logger.log({
          level: 'error',
          message: `Não existe User cadastrado.`
        });

        return;
      } else {
        if (auth.password !== req.query.password) {
          res.status(500).json({
            error: 'Senha inválida!'
          });

          logger.log({
            level: 'error',
            message: `Senha inválida.`
          });
        } else {
          req.session.logado = true;
          let passwordEncrypted = crypto.createHash('md5').update(auth.password).digest('hex');
          let userAuth = {
            username: auth.username,
            token: passwordEncrypted,
          }
          userAuth = JSON.stringify(userAuth);
          let localStorage = new LocalStorage('./scratch');
          localStorage.setItem('userAuth', userAuth);
        }

      }
      res.status(200).json(auth);
    } catch (error) {
      res.status(500).json({
        error: error
      });
      return;
    }
  }

}