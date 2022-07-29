const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class recebimentoModel {
    async listaAll(id_usuario) {
        var recebimento = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('recebimento').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            recebimento = resposta;
        });
        return recebimento;
    }
    async listaId(id, id_usuario) {
        var recebimento = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('recebimento').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            recebimento = resposta;
        });
        return recebimento;
    }
    async salvar(recebimento) {
        var dados = {};
        var ExisteRecebimento = 0;
        if (!recebimento.nome) throw new Validacao('O nome do recebimento é obrigatorio');
        if (!recebimento.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from recebimento a
                            where id_usuario = ${recebimento.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.nome) = LOWER('${recebimento.nome}') `).then((resposta) => {
            ExisteRecebimento = Number(resposta.rows[0].id);
        })
        if (ExisteRecebimento > 0) {
            throw new Validacao('Esse recebimento ja esta cadastrado');
        }
        await knex('recebimento').insert(recebimento).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...recebimento
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, recebimento) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('recebimento').update(recebimento).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('recebimento').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = recebimentoModel;