const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');
const moment = require('moment');

class lancamentoModel {
    async salvar(lancamento) {
        var dados = {};
        if (!lancamento.id_usuario) throw new Validacao('Uusario não autorizado');
        if (!lancamento.valor) throw new Validacao('É obrigado informar o valor');
        if (!lancamento.data) throw new Validacao('É obrigado informar o valor');
        if (!lancamento.id_conta) throw new Validacao('É obrigado informar a forma de pagamento');

        var ultimo_id = null;

        // verificando o saldo do cartão
        var saldo = null;
        var tipo = null;
        await knex('conta').where({ 'id': Number(lancamento.id_conta), 'id_usuario': Number(lancamento.id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
            tipo = resposta[0].tipo;
        });


        //Verificando o tipo e atualizando o banco
        if (lancamento.tipo === 'Entrada') {
            if (saldo < 0) {
                throw new Validacao('Atenção o saldo do seu cartão esta negativo, atualize seu saldo para continuar');
                return;
            } else {
                let saldo_atualizado = Number(saldo) + Number(lancamento.valor);
                await knex('conta').update({ 'saldo': saldo_atualizado }).where({ 'id': Number(lancamento.id_conta), 'id_usuario': Number(lancamento.id_usuario) });
            }
        }
        if (lancamento.tipo === 'Saida') {
            if (Number(saldo) < Number(lancamento.valor)) {
                throw new Validacao('Atenção você não tem saldo suficiente na conta para fazer esse lançamento');
                return;
            } else {
                let saldo_atualizado = Number(saldo) - Number(lancamento.valor);
                await knex('conta').update({ 'saldo': saldo_atualizado }).where({ 'id': Number(lancamento.id_conta), 'id_usuario': Number(lancamento.id_usuario) });
            }

        }
        //Fazendo o lançamento
        await knex('lancamento').insert(lancamento).returning('id').then((resposta) => {
            ultimo_id = resposta[0].id;
            dados = {
                'id': resposta[0].id,
                ...lancamento
            }
        });
       
        return dados;
    }
    async listaId(id_usuario, id) {
        var lancamentos = {};
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        if (!id) throw new Validacao('Lançamento não encontrado');

        await knex.select(['lancamento.*', 'receita.receita', 'despesa.despesa', 'usuario.nome', 'cartao.cartao'])
            .from('lancamento')
            .leftJoin('receita', 'lancamento.id_receita', '=', 'receita.id')
            .leftJoin('despesa', 'lancamento.id_despesa', '=', 'despesa.id')
            .leftJoin('usuario', 'lancamento.id_usuario', '=', 'usuario.id')
            .leftJoin('cartao', 'lancamento.id_cartao', '=', 'cartao.id')
            .where({ 'lancamento.id': id, 'lancamento.id_usuario': id_usuario })
            .then((resposta) => {
                lancamentos = resposta;
            });
        return lancamentos;
    }
    async listaRaw(id_usuario, ano, mes) {
        var lancamento = {}
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        if (!ano) throw new Validacao('Precisa informar um ano');

        await knex.raw(`select lanc.id, lanc.observacao, lanc.valor, lanc.tipo, lanc.data,
                case
                when fixa.nome  <> '' THEN fixa.nome
                when var.nome  <> '' THEN var.nome
                when imp.nome  <> '' THEN imp.nome
                when rec.nome  <> '' THEN rec.nome
                when trans.nome  <> '' THEN trans.nome
                end  as fluxo
                FROM lancamento lanc
                LEFT join despesa_fixa fixa on lanc.id_despesa_fixa = fixa.id
                LEFT join despesa_variavel var on lanc.id_despesa_variavel = var.id
                LEFT join imposto imp on lanc.id_imposto = imp.id
                LEFT join recebimento rec on lanc.id_recebimento = rec.id
                LEFT join transferencia trans on lanc.id_transferencia = trans.id 

         WHERE EXTRACT(month from data) = ${mes}
         and EXTRACT(year from data) = ${ano}
         and lanc.id_usuario = ${id_usuario}`).then(async (res) => {
            lancamento = res.rows;
        });
        return lancamento;

    }
    async excluir(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um lançamento para excluir');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_conta = null;
        var saldo = null;
        var tipo = null;

        //Pegando os dados necessarios para excluir 
        await knex('lancamento').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_conta = Number(resposta[0].id_conta);
            tipo = resposta[0].tipo;
        });

        //Pegando o saldo atual do cartão
        await knex('conta').where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            console.log(resposta)          
            saldo = resposta[0].saldo;
        });

        //atualiza saldo do banco
        if (tipo == 'Saida') {
            let atualiza_saldo = Number(saldo) + Number(valor);
            await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });
        }

        if (tipo == 'Entrada') {
            let atualiza_saldo = Number(saldo) - Number(valor);
            await knex('conta').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_conta), 'id_usuario': Number(id_usuario) });          
        }

        await knex('lancamento').del().where({ 'id': id, 'id_usuario': id_usuario });

    }
}
module.exports = lancamentoModel;