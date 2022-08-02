const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');
const moment = require('moment');

class receberModel {
    async listaAll(id_usuario, ano, mes) {
        var listaReceber = {};
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        await knex.raw(`select rb.id, rb.observacao, rb.valor, rb.parcela, rb.status, rb.vencimento,
                        case
                        when fixa.nome  <> '' THEN fixa.nome
                        when var.nome  <> '' THEN var.nome
                        when imp.nome  <> '' THEN imp.nome
                        when rec.nome  <> '' THEN rec.nome
                        when trans.nome  <> '' THEN trans.nome
                        end  as fluxo
                        FROM contas_receber rb
                        LEFT join despesa_fixa fixa on rb.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on rb.id_despesa_variavel = var.id
                        LEFT join imposto imp on rb.id_imposto = imp.id
                        LEFT join recebimento rec on rb.id_recebimento = rec.id
                        LEFT join transferencia trans on rb.id_transferencia = trans.id 

                        WHERE EXTRACT(month from rb.data_lancamento) = ${mes}
                        and EXTRACT(year from rb.data_lancamento) = ${ano}
                        and rb.id_usuario = ${id_usuario} `).then(async (res) => {
            listaReceber = res.rows;
        });
        return listaReceber;
    }
    async listaAllPendente(id_usuario, ano, mes) {
        var listaReceber = {};
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        await knex.raw(`select rb.id, rb.observacao, rb.valor, rb.parcela, rb.status, rb.vencimento,
                        case
                        when fixa.nome  <> '' THEN fixa.nome
                        when var.nome  <> '' THEN var.nome
                        when imp.nome  <> '' THEN imp.nome
                        when rec.nome  <> '' THEN rec.nome
                        when trans.nome  <> '' THEN trans.nome
                        end  as fluxo
                        FROM contas_receber rb
                        LEFT join despesa_fixa fixa on rb.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on rb.id_despesa_variavel = var.id
                        LEFT join imposto imp on rb.id_imposto = imp.id
                        LEFT join recebimento rec on rb.id_recebimento = rec.id
                        LEFT join transferencia trans on rb.id_transferencia = trans.id 

                        WHERE EXTRACT(month from rb.data_lancamento) = ${mes}
                        and EXTRACT(year from rb.data_lancamento) = ${ano}
                        and rb.id_usuario = ${id_usuario} and rb.status = 'Pendente'`).then(async (res) => {
            listaReceber = res.rows;
        });
        return listaReceber;
    }
    async salvar(receber) {

        var dados = [];
        if (!receber.status) throw new Validacao('É obrigado informar o status');
        if (!receber.data_lancamento) throw new Validacao('É obrigado informar a data do lançamento');
        if (!receber.qtde_parcela) throw new Validacao('É obrigado informar a quantidade de parcela');
        if (!receber.valor) throw new Validacao('É obrigado informar o valor');

        receber.qtde_parcela = Number(receber.qtde_parcela);
        receber.data_lancamento = moment(receber.data_lancamento).format(`YYYY-MM-DD`);
        var identificador = Number((Math.floor(999 * Math.random() + 1)) + (Number(Math.random(2)) + Number(moment().format().replace(/[^0-9]/g, ''))));
        var qtde = 1;
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        receber.valor = parseFloat(parseFloat(receber.valor) / receber.qtde_parcela);
        for (var i = 1; i <= receber.qtde_parcela; i++) {
            var data2 = {};
            var data = {
                ...receber,
                'identificador': identificador,
                'parcela': qtde,
                'vencimento': moment(`${ano}${mes}${receber.dia_vencimento}`).add(qtde, 'month').format(`YYYY-MM-DD`),
            }
            qtde = Number(qtde) + Number(1)
            await knex('contas_receber').insert(data).returning('id').then((resposta) => {
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
        await knex('contas_receber').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
        });

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        let atualiza_saldo = Number(saldo) - Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });

        await knex('contas_receber').del().where({ id: id, id_usuario: id_usuario });
    }
    async baixa(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um documento para baixar');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_conta = null;
        var saldo = null;

        //Pegando os dados necessarios para excluir 
        await knex('contas_receber').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
        });

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        //atualiza saldo do banco
        //  if (Number(saldo) < Number(valor)) throw new Validacao('Saldo insuficiente para pagar esse documento');
        let atualiza_saldo = Number(saldo) + Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });
        await knex('contas_receber').update({ 'status': 'Recebido' }).where({ 'id': id, 'id_usuario': id_usuario });
    }

    async cancelarRecebimento(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um documento para cancelar');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_conta = null;
        var saldo = null;

        //Pegando os dados necessarios para excluir 
        await knex('contas_receber').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
        });

        //Pegando o saldo atual da conta
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
        });
        //atualiza saldo do banco
        if (Number(saldo) < Number(valor)) throw new Validacao('Saldo insuficiente para pagar esse documento');
        let atualiza_saldo = Number(saldo) - Number(valor);
        await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });

        await knex('contas_receber').update({ 'status': 'Pendente' }).where({ 'id': id, 'id_usuario': id_usuario });
    }
}

module.exports = receberModel;