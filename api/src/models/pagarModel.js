const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');
const moment = require('moment');

class pagarModel {
    async listaAll(id_usuario, ano, mes) {
        var listaPagar = {};
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        await knex.raw(`select pag.id, pag.observacao, pag.valor, pag.parcela, pag.status, pag.vencimento,
                        case
                        when fixa.nome  <> '' THEN fixa.nome
                        when var.nome  <> '' THEN var.nome
                        when imp.nome  <> '' THEN imp.nome
                        when rec.nome  <> '' THEN rec.nome
                        when trans.nome  <> '' THEN trans.nome
                        end  as fluxo
                        FROM contas_pagar pag
                        LEFT join despesa_fixa fixa on pag.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on pag.id_despesa_variavel = var.id
                        LEFT join imposto imp on pag.id_imposto = imp.id
                        LEFT join recebimento rec on pag.id_recebimento = rec.id
                        LEFT join transferencia trans on pag.id_transferencia = trans.id 

                WHERE EXTRACT(month from pag.data_lancamento) = ${mes}
                and EXTRACT(year from pag.data_lancamento) = ${ano}
                and pag.id_usuario = ${id_usuario} `).then(async (res) => {
            listaPagar = res.rows;
        });
        return listaPagar;
    }
    async listaAllPendente(id_usuario, ano, mes) {
        var listaPagar = {};
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        await knex.raw(`select pag.id, pag.observacao, pag.valor, pag.parcela, pag.status, pag.vencimento,
                        case
                        when fixa.nome  <> '' THEN fixa.nome
                        when var.nome  <> '' THEN var.nome
                        when imp.nome  <> '' THEN imp.nome
                        when rec.nome  <> '' THEN rec.nome
                        when trans.nome  <> '' THEN trans.nome
                        end  as fluxo
                        FROM contas_pagar pag
                        LEFT join despesa_fixa fixa on pag.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on pag.id_despesa_variavel = var.id
                        LEFT join imposto imp on pag.id_imposto = imp.id
                        LEFT join recebimento rec on pag.id_recebimento = rec.id
                        LEFT join transferencia trans on pag.id_transferencia = trans.id 

                WHERE EXTRACT(month from pag.data_lancamento) = ${mes}
                and EXTRACT(year from pag.data_lancamento) = ${ano}
                and pag.id_usuario = ${id_usuario} and pag.status = 'Pendente'`).then(async (res) => {
            listaPagar = res.rows;
        });
        return listaPagar;
    }
    async salvar(pagar) {

        var dados = [];
        if (!pagar.qtde_parcela) throw new Validacao('É obrigado informar a quantidade de parcela');
        if (!pagar.valor) throw new Validacao('É obrigado informar o valor');
        if (pagar.valor <= 0) throw new Validacao('Valor é invalido');

        pagar.qtde_parcela = Number(pagar.qtde_parcela);
        pagar.data_lancamento = moment(pagar.data_lancamento).format(`YYYY-MM-DD`);
        var identificador = Number((Math.floor(999 * Math.random() + 1)) + (Number(Math.random(2)) + Number(moment().format().replace(/[^0-9]/g, ''))));
        var qtde = 1;
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        pagar.valor = parseFloat(parseFloat(pagar.valor) / pagar.qtde_parcela);
        for (var i = 1; i <= pagar.qtde_parcela; i++) {
            var data2 = {};
            var data = {
                ...pagar,
                'identificador': identificador,
                'parcela': qtde,
                'vencimento': moment(`${ano}${mes}${pagar.dia_vencimento}`).add(qtde, 'month').format(`YYYY-MM-DD`),
            }
            qtde = Number(qtde) + Number(1)
            await knex('contas_pagar').insert(data).returning('id').then((resposta) => {
                data2 = {
                    'id': resposta[0].id,
                    ...data
                }
            });
            dados.push(data2);
        }
        return dados;
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um documento');

        var valor = null;
        var id_conta = null;
        var saldo = null;

        //Pegando os dados necessarios para excluir 
        await knex('contas_pagar').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
        });

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        let atualiza_saldo = Number(saldo) + Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });
        await knex('contas_pagar').del().where({ id: id, id_usuario: id_usuario });
    }
    async baixa(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um documento para baixar');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_conta = null;
        var saldo = null;

        var observacao = 'Baixa Doc pagar';
        var tipo = 'Saida';
        var id_recebimento = null;
        var id_despesa_fixa = null;
        var id_despesa_variavel = null;
        var id_imposto = null;
        var id_transferencia = null;
        var data = null;
        var id_contas_pagar = null


        //Pegando os dados necessarios para excluir 
        await knex('contas_pagar').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            console.log(resposta)

            valor = Number(resposta[0].valor);
            id_conta = Number(resposta[0].id_conta);
            id_recebimento = resposta[0].id_recebimento;
            id_despesa_fixa = resposta[0].id_despesa_fixa;
            id_despesa_variavel = resposta[0].id_despesa_variavel;
            id_imposto = resposta[0].id_imposto;
            id_transferencia = resposta[0].id_transferencia;
            data = moment(resposta[0].data).format('YYYY-MM-DD');
            id_contas_pagar = resposta[0].id;
        });

        var data_pagar = {
            'valor': valor,
            'id_conta': id_conta,
            'observacao': observacao,
            'tipo': tipo,
            'id_usuario': id_usuario,
            'id_recebimento': id_recebimento,
            'id_despesa_fixa': id_despesa_fixa,
            'id_despesa_variavel': id_despesa_variavel,
            'id_imposto': id_imposto,
            'id_transferencia': id_transferencia,
            'data': data,
            'id_contas_pagar': id_contas_pagar
        }


        //fazendo lançamento
        await knex('lancamento').insert(data_pagar);

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        //atualiza saldo do banco
        if (Number(saldo) < Number(valor)) throw new Validacao('Saldo insuficiente para pagar esse documento');
        let atualiza_saldo = Number(saldo) - Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });
        await knex('contas_pagar').update({ 'status': 'Pago', 'data_pagamento': moment().format('YYYY-MM-DD') }).where({ 'id': id, 'id_usuario': id_usuario });
    }
    async cancelarBaixa(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um documento para baixar');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_conta = null;
        var saldo = null;

        //Pegando os dados necessarios para excluir 
        await knex('contas_pagar').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
        });

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        //atualiza saldo do banco
        if (Number(saldo) < Number(valor)) throw new Validacao('Saldo insuficiente para pagar esse documento');
        let atualiza_saldo = Number(saldo) + Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });

        await knex('lancamento').del().where({ 'id_contas_pagar': id, 'id_usuario': id_usuario });
        await knex('contas_pagar').update({ 'status': 'Pendente', 'data_pagamento': null }).where({ 'id': id, 'id_usuario': id_usuario });
    }
}

module.exports = pagarModel;