const Joi = require('joi');
const {
  LocalStorage
} = require("node-localstorage");
const PeticoesModel = require('../models/peticoesModel');
const logger = require('../../config/logger');

const schema = Joi.object().keys({
  titulo: Joi.string().required().min(5).max(50),
  descricao: Joi.string().required().min(5).max(150),
  criador: Joi.string().required().min(5).max(150),
  meta: Joi.number().required(),
  qtd_assinaturas: Joi.number().required(),
});

const schema2 = Joi.object().keys({
  id_peticao: Joi.string().required(),
  token_user: Joi.string().required().min(5).max(150),
  username: Joi.string().required(),
});

module.exports = class Peticoes {
  static async getPeticao(req, res, next) {
    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.token = userStorage.token;
    }

    console.log('Controller Peticao - get peticao with ID', req.query._id);

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    try {
      const peticao = await PeticoesModel.getPeticao(req.query._id);

      if (!peticao) {
        res.status(404).json(`Não existe Peticao cadastrado.`);
        return;
      }

      res.status(200).json(peticao);
    } catch (error) {
      console.log(`[getpeticao error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async deletePeticao(req, res, next) {
    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.token = userStorage.token;
    }

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    let acesso_negado = false;

    const peticoes = await PeticoesModel.getPeticoes();

    let validar_peticao = peticoes.filter((peticao) => peticao._id == req.query._id && peticao.criador == req.session.username);

    if (validar_peticao.length > 0) {
      acesso_negado = true;
    }

    if (acesso_negado) {
      res.status(500).json({
        error: "Acesso negado: Petição não cadastrada por esse usuário"
      });
    } else {
      try {
        const peticao = await PeticoesModel.deletePeticao(req.query._id);

        if (!peticao) {
          res.status(404).json(`Erro ao deletar Peticao.`);
          return;
        }

        res.status(200).json(peticao);
      } catch (error) {
        console.log(`[deletepeticao error] ${error}`);
        res.status(500).json({
          error: error
        });
        return;
      }
    }
  }

  static async updatePeticao(req, res, next) {
    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.username = userStorage.username;
      req.query.criador = userStorage.username;
      req.query.qtd_assinaturas = 0;
    }

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    let acesso_negado = false;

    const peticoes = await PeticoesModel.getPeticoes();

    let validar_peticao = peticoes.filter((peticao) => peticao._id == req.query._id && peticao.criador == req.session.username);

    if (validar_peticao.length == 0) {
      acesso_negado = true;
    }

    if (acesso_negado) {

      res.status(500).json({
        error: "Acesso negado: Petição não cadastrada por esse usuário"
      });
      return

    } else {

      try {

        let getPeticao = await PeticoesModel.getPeticao(req.query._id);

        let peticaoUpdate = {titulo: req.query.titulo, meta: req.query.meta, descricao: req.query.descricao, criador: getPeticao.criador, qtd_assinaturas: getPeticao.qtd_assinaturas}

        const peticao = await PeticoesModel.updatePeticao(req.query._id, peticaoUpdate);

        if (!peticao) {
          res.status(404).json(`Não existe Peticao cadastrada.`);
          return;
        }

        res.status(200).json(peticao);
      } catch (error) {
        res.status(500).json({
          error: error
        });
        return;
      }
    }
  }

  static async getPeticoes(req, res, next) {
    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage !== null && userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.token = userStorage.token;
    }

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    try {
      const peticoes = await PeticoesModel.getPeticoes();

      if (!peticoes) {
        res.status(404).json(`Não existe Peticao cadastrada.`);
        return;
      }

      res.status(200).json(peticoes);
    } catch (error) {
      console.log(`[getallpeticoes error] ${error}`);
      res.status(500).json({
        error: error
      });
      return;
    }
  }

  static async addPeticao(req, res, next) {

    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.token = userStorage.token;
      req.query.criador = userStorage.username;
      req.query.qtd_assinaturas = 0;
    }

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    const {
      error,
      value
    } = schema.validate(req.query);

    if (error) {
      const result = {
        msg: 'Peticao não incluída. Campos não foram preenchidos corretamente.',
        error: error.details
      }

      logger.log({
        level: 'error',
        message: `Campos preenchidos incorretamente.`,
      });

      res.status(404).json(result);
      return;
    }
    if (!req.session.logado) return
    try {
      const addedPeticao = await PeticoesModel.addPeticao(req.query);
      res.status(200).json(addedPeticao);
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  }

  static async assinarPeticao(req, res, next) {
    let localStorage = new LocalStorage('./scratch');
    let userStorage = JSON.parse(localStorage.getItem('userAuth'));

    if (userStorage.token !== undefined && userStorage.token !== '') {
      req.session.logado = true;
      req.session.token = userStorage.token;
      req.query.username = userStorage.username;
      req.query.token_user = userStorage.token;
    }

    if (!req.session.logado) return res.status(500).json({
      error: 'Usuário não autenticado!'
    });

    const {
      error,
      value
    } = schema2.validate(req.query);

    if (error) {
      const result = {
        msg: 'Peticao não assinada. Campos não foram preenchidos corretamente.',
        error: error.details
      }
      res.status(404).json(result);
      return;
    }
    if (!req.session.logado) return;

    try {
      let ja_assinado = false;

      const assinaturas = await PeticoesModel.getAssinatura();

      let validar_assinatura = assinaturas.filter((assinatura) => assinatura.id_peticao == req.query.id_peticao && assinatura.token_user == req.query.token_user);

      if (validar_assinatura.length > 0) {
        ja_assinado = true;
      }

      if (ja_assinado) {
        res.status(500).json({
          error: "Petição já assinada por este usuario"
        });
      } else {

        let getPeticao = await PeticoesModel.getPeticao(req.query.id_peticao);
        getPeticao.qtd_assinaturas = Number(getPeticao.qtd_assinaturas) + 1;

        await PeticoesModel.updatePeticao(req.query.id_peticao, getPeticao);

        const assinedPeticao = await PeticoesModel.assinarPeticao(req.query);

        res.status(200).json(assinedPeticao);
      }
    } catch (error) {
      res.status(500).json({
        error: error
      });
    }
  }
}