const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class despesaVariavelModel {
    async listaAll(id_usuario) {
        var despesa_variavel = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('despesa_variavel').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            despesa_variavel = resposta;
        })
        return despesa_variavel;
    }
    async listaId(id, id_usuario) {
        var despesa_variavel = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('despesa_variavel').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            despesa_variavel = resposta;
        })
        return despesa_variavel;
    }
    async salvar(despesa_variavel) {
        var dados = {};
        var ExisteDespesa = 0;
        if (!despesa_variavel.nome) throw new Validacao('O nome da despesa é obrigatorio');
        if (!despesa_variavel.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from despesa_variavel a
                            where id_usuario = ${despesa_variavel.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.nome) = LOWER('${despesa_variavel.nome}') `).then((resposta) => {
            ExisteDespesa = Number(resposta.rows[0].id);
        })
        if (ExisteDespesa > 0) {
            throw new Validacao('Essa Despesa ja esta cadastrado');
        }
        await knex('despesa_variavel').insert(despesa_variavel).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...despesa_variavel
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, despesa_variavel) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('despesa_variavel').update(despesa_variavel).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('despesa_variavel').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = despesaVariavelModel;