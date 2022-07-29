const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class contaModel {
    async listaAll(id_usuario) {
        var conta = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('conta').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            conta = resposta;
        })
        return conta;
    }
    async listaId(id, id_usuario) {
        var conta = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('conta').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            conta = resposta;
        })
        return conta;
    }
    async salvar(conta) {
        var dados = {};
        var Existeconta = 0;
        if (!conta.nome) throw new Validacao('O nome do conta é obrigatorio');
        if (!conta.tipo) throw new Validacao('O tipo do conta é obrigatorio');
        if (!conta.saldo) throw new Validacao('O saldo da conta é obrigatorio');
        if (!conta.conta) throw new Validacao('O numero da conta é obrigatorio');
        if (!conta.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from conta a
                            where id_usuario = ${conta.id_usuario}  
                            and status = 'Ativo'
                            and a.conta = '${conta.conta}' `).then((resposta) => {
            Existeconta = Number(resposta.rows[0].id);
        })
        if (Existeconta > 0) {
            throw new Validacao('Essa conta ja esta cadastrado');
        }
        await knex('conta').insert(conta).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...conta
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, conta) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('conta').update(conta).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('conta').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = contaModel;