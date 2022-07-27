const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');
const moment = require('moment');

class lancamentoModel {
    async salvar(lancamento) {
        var dados = {};
        if (!lancamento.id_usuario) throw new Validacao('Uusario não autorizado');
        if (!lancamento.valor) throw new Validacao('É obrigado informar o valor');
        if (!lancamento.tipo) throw new Validacao('É obrigdo nformar o valor');
        if (!lancamento.data) throw new Validacao('É obrigado informar o valor');
        if (!lancamento.id_cartao) throw new Validacao('É obrigado informar a forma de pagamento');

        var ultimo_id = null;
        //Faazendo o lançamento
        await knex('lancamento').insert(lancamento).returning('id').then((resposta) => {
            ultimo_id = resposta[0].id;
            dados = {
                'id': resposta[0].id,
                ...lancamento
            }
        });

        // verificando o saldo do cartão
        var saldo = null;
        var tipo = null;
        await knex('cartao').where({ 'id': Number(lancamento.id_cartao), 'id_usuario': Number(lancamento.id_usuario) }).select('*').then((resposta) => {
            saldo = resposta[0].saldo;
            tipo = resposta[0].tipo;
        });

        //Verificando o tipo e atualizando o banco
        if (lancamento.tipo == 'Entrada') {
            if (saldo < 0) throw new Validacao('Atenção o saldo do seu cartão esta negativo, atualize seu saldo para continuar');
            let saldo_atualizado = Number(saldo) + Number(lancamento.valor);
            await knex('cartao').update({ 'saldo': saldo_atualizado }).where({ 'id': Number(lancamento.id_cartao), 'id_usuario': Number(lancamento.id_usuario) });
        }
        if (lancamento.tipo == 'Saida') {
            if (tipo == 'Debito') {
                if (Number(saldo) < Number(lancamento.valor)) throw new Validacao('Atenção você não tem saldo suficiente na conta para fazer esse lançamento');
                let saldo_atualizado = Number(saldo) - Number(lancamento.valor);
                await knex('cartao').update({ 'saldo': saldo_atualizado }).where({ 'id': Number(lancamento.id_cartao), 'id_usuario': Number(lancamento.id_usuario) });
            }
            if (tipo == 'Credito') {
                var data = {
                    'valor': lancamento.valor,
                    'id_usuario': lancamento.id_usuario,
                    'id_cartao': lancamento.id_cartao,
                    'id_lancamento': ultimo_id,
                    'data': moment().format('YYYY-MM-DD'),
                    'status': 'Cartao de credito'
                }

                //Fazendo o lançamento se for Cartão de credito e atualiando a fatura
                await knex('fatura').insert(data);
                let saldo_atualizado = Number(saldo) + Number(lancamento.valor);
                await knex('cartao').update({ 'saldo': saldo_atualizado }).where({ 'id': Number(lancamento.id_cartao), 'id_usuario': Number(lancamento.id_usuario) });
            }
        }

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

        await knex.raw(` SELECT lanc.id, lanc.observacao, lanc.valor, lanc.tipo, lanc.data,
         case when rec.receita  <> '' THEN rec.receita else des.despesa end  as fluxo
         FROM lancamento lanc
         LEFT join despesa des on lanc.id_despesa = des.id
         LEFT join receita rec on lanc.id_receita = rec.id
         WHERE EXTRACT(month from data) = ${mes}
         and EXTRACT(year from data) = ${ano}`).then(async (res) => {
            lancamento = res.rows;
        });
        return lancamento;

    }
    async excluir(id, id_usuario) {
        if (!id) throw new Validacao('Escolha um lançamento para excluir');
        if (!id_usuario) throw new Validacao('Usuario não autorizado');

        var valor = null;
        var id_cartao = null;
        var saldo = null;
        var tipo = null;

        //Pegando os dados necessarios para excluir 
        await knex('lancamento').where({ 'id': Number(id), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            valor = resposta[0].valor;
            id_cartao = Number(resposta[0].id_cartao);
        });

        //Pegando o saldo atual do cartão
        await knex('cartao').where({ 'id': Number(id_cartao), 'id_usuario': Number(id_usuario) }).select('*').then((resposta) => {
            console.log(resposta)
            tipo = resposta[0].tipo;
            saldo = resposta[0].saldo;
        });

        //atualiza saldo do banco
        if (tipo == 'Debito') {
            let atualiza_saldo = Number(saldo) + Number(valor);
            await knex('cartao').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_cartao), 'id_usuario': Number(id_usuario) });
        }

        if (tipo == 'Credito') {
            let atualiza_saldo = Number(saldo) - Number(valor);
            await knex('cartao').update({ 'saldo': atualiza_saldo }).where({ 'id': Number(id_cartao), 'id_usuario': Number(id_usuario) });
            await knex('fatura').del().where({ 'id_lancamento': id, 'id_usuario': id_usuario });
        }

        await knex('lancamento').del().where({ 'id': id, 'id_usuario': id_usuario });

    }
}
module.exports = lancamentoModel;