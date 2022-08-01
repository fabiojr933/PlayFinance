const express = require('express');
const route = express.Router();
const middlewares = require('./middlewares/autenticacao');
const usuarioController = require('./controller/usuarioController');
const despesaFixaController = require('./controller/despesaFixaController');
const despesaVariavelController = require('./controller/despesaVariavelController');
const rebimentoController = require('./controller/recebimentosController');
const impostoController = require('./controller/impostoController');
const contaController = require('./controller/contaController');
const lancamentoController = require('./controller/lacamentoController');
const transferenciaController = require('./controller/transferenciaController');
const pagarController = require('./controller/pagarController');
const receberController = require('./controller/receberController');

const usuario = new usuarioController();
const despesaFixa = new despesaFixaController();
const despesaVariavel = new despesaVariavelController();
const recebimento = new rebimentoController();
const imposto = new impostoController();
const conta = new contaController();
const transferencia = new transferenciaController();
const lancamento = new lancamentoController();
const contaPagar = new pagarController();
const contaReceber = new receberController();

route.post('/usuario', usuario.salvar);
route.put('/usuario/:id', usuario.alterar);
route.post('/login', usuario.login);

route.post('/despesaFixa', middlewares.Autorizacao, despesaFixa.salvar);
route.get('/despesaFixa', middlewares.Autorizacao, despesaFixa.listaAll);
route.get('/despesaFixa/:id', middlewares.Autorizacao, despesaFixa.listaId);
route.delete('/despesaFixa/:id', middlewares.Autorizacao, despesaFixa.excluir);
route.put('/despesaFixa/:id', middlewares.Autorizacao, despesaFixa.atualizar);

route.post('/despesaVariavel', middlewares.Autorizacao, despesaVariavel.salvar);
route.get('/despesaVariavel', middlewares.Autorizacao, despesaVariavel.listaAll);
route.get('/despesaVariavel/:id', middlewares.Autorizacao, despesaVariavel.listaId);
route.delete('/despesaVariavel/:id', middlewares.Autorizacao, despesaVariavel.excluir);
route.put('/despesaVariavel/:id', middlewares.Autorizacao, despesaVariavel.atualizar);

route.post('/imposto', middlewares.Autorizacao, imposto.salvar);
route.get('/imposto', middlewares.Autorizacao, imposto.listaAll);
route.get('/imposto/:id', middlewares.Autorizacao, imposto.listaId);
route.delete('/imposto/:id', middlewares.Autorizacao, imposto.excluir);
route.put('/imposto/:id', middlewares.Autorizacao, imposto.atualizar);

route.post('/recebimento', middlewares.Autorizacao, recebimento.salvar);
route.get('/recebimento', middlewares.Autorizacao, recebimento.listaAll);
route.get('/recebimento/:id', middlewares.Autorizacao, recebimento.listaId);
route.delete('/recebimento/:id', middlewares.Autorizacao, recebimento.excluir);
route.put('/recebimento/:id', middlewares.Autorizacao, recebimento.atualizar);

route.post('/conta', middlewares.Autorizacao, conta.salvar);
route.get('/conta', middlewares.Autorizacao, conta.listaAll);
route.get('/conta/:id', middlewares.Autorizacao, conta.listaId);
route.delete('/conta/:id', middlewares.Autorizacao, conta.excluir);
route.put('/conta/:id', middlewares.Autorizacao, conta.atualizar);

route.post('/transferencia', middlewares.Autorizacao, transferencia.salvar);
route.get('/transferencia', middlewares.Autorizacao, transferencia.listaAll);
route.get('/transferencia/:id', middlewares.Autorizacao, transferencia.listaId);
route.delete('/transferencia/:id', middlewares.Autorizacao, transferencia.excluir);
route.put('/transferencia/:id', middlewares.Autorizacao, transferencia.atualizar);

route.post('/lancamento', middlewares.Autorizacao, lancamento.salvar);
route.get('/lancamento/:id', middlewares.Autorizacao, lancamento.listaId);
route.get('/lancamento/:ano/:mes', middlewares.Autorizacao, lancamento.listaRaw);
route.delete('/lancamento/:id', middlewares.Autorizacao, lancamento.excluir);

route.post('/contasPagar', middlewares.Autorizacao, contaPagar.salvar);
route.get('/contasPagar/:ano/:mes', middlewares.Autorizacao, contaPagar.listaAll);
route.get('/contasPagar/pendente/:ano/:mes', middlewares.Autorizacao, contaPagar.listaAllPendente);
route.put('/contasPagar/baixa/:id', middlewares.Autorizacao, contaPagar.baixa);
route.put('/contasPagar/cancelarBaixa/:id', middlewares.Autorizacao, contaPagar.cancelarBaixa);
route.delete('/contasPagar/:id', middlewares.Autorizacao, contaPagar.excluir);

route.post('/contasReceber', middlewares.Autorizacao, contaReceber.salvar);
route.get('/contasReceber', middlewares.Autorizacao, contaReceber.listaAll);
route.get('/contasReceber/pendente', middlewares.Autorizacao, contaReceber.listaAllPendente);
route.put('/contasReceber/baixa/:id', middlewares.Autorizacao, contaReceber.baixa);
route.delete('/contasReceber/:id', middlewares.Autorizacao, contaReceber.excluir);

module.exports = route;