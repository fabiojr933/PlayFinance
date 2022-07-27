const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class cartaoModel {
    async listaAll(id_usuario) {
        var cartao = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('cartao').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            cartao = resposta;
        })
        return cartao;
    }
    async listaId(id, id_usuario) {
        var cartao = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('cartao').where({'id': id,  'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            cartao = resposta;
        })
        return cartao;
    }
    async salvar(cartao) {
        var dados = {};
        var ExisteCartao = 0;
        if (!cartao.cartao) throw new Validacao('O nome do cartao é obrigatorio');
        if (!cartao.tipo) throw new Validacao('O tipo do cartao é obrigatorio');
        if (!cartao.saldo) throw new Validacao('O saldo da cartao é obrigatorio');
        if (!cartao.conta) throw new Validacao('O numero da cartao é obrigatorio');
        if (!cartao.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from cartao a
                            where id_usuario = ${cartao.id_usuario}  
                            and status = 'Ativo'
                            and a.conta = '${cartao.conta}' `).then((resposta) => {
            ExisteCartao = Number(resposta.rows[0].id);
        })
        if (ExisteCartao > 0) {
            throw new Validacao('Essa cartao ja esta cadastrado');
        }
        await knex('cartao').insert(cartao).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...cartao
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, cartao) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('cartao').update(cartao).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('cartao').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = cartaoModel;