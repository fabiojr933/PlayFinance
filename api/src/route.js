const express = require('express');
const route = express.Router();
const middlewares = require('./middlewares/autenticacao');
const usuarioController = require('./controller/usuarioController');
const despesaController = require('./controller/despesaController');
const receitaController = require('./controller/receitaController');
const cartaoController = require('./controller/cartaoController');
const lancamentoController = require('./controller/lacamentoController');

const usuario = new usuarioController();
const despesa = new despesaController();
const receita = new receitaController();
const cartao = new cartaoController();
const lancamento = new lancamentoController();

route.post('/usuario', usuario.salvar);
route.put('/usuario/:id', usuario.alterar);
route.post('/login', usuario.login);

route.post('/despesa', middlewares.Autorizacao, despesa.salvar);
route.get('/despesa', middlewares.Autorizacao, despesa.listaAll);
route.get('/despesa/:id', middlewares.Autorizacao, despesa.listaId);
route.delete('/despesa/:id', middlewares.Autorizacao, despesa.excluir);
route.put('/despesa/:id', middlewares.Autorizacao, despesa.atualizar);

route.post('/receita', middlewares.Autorizacao, receita.salvar);
route.get('/receita', middlewares.Autorizacao, receita.listaAll);
route.get('/receita/:id', middlewares.Autorizacao, receita.listaId);
route.delete('/receita/:id', middlewares.Autorizacao, receita.excluir);
route.put('/receita/:id', middlewares.Autorizacao, receita.atualizar);

route.post('/cartao', middlewares.Autorizacao, cartao.salvar);
route.get('/cartao', middlewares.Autorizacao, cartao.listaAll);
route.get('/cartao/:id', middlewares.Autorizacao, cartao.listaId);
route.delete('/cartao/:id', middlewares.Autorizacao, cartao.excluir);
route.put('/cartao/:id', middlewares.Autorizacao, cartao.atualizar);

route.post('/lancamento', middlewares.Autorizacao, lancamento.salvar);
route.get('/lancamento/:id', middlewares.Autorizacao, lancamento.listaId);
route.get('/lancamento/:ano/:mes', middlewares.Autorizacao, lancamento.listaRaw);
route.delete('/lancamento/:id', middlewares.Autorizacao, lancamento.excluir);

module.exports = route;