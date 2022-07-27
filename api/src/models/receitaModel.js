const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class receitaModel {
    async listaAll(id_usuario) {
        var receitas = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('receita').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            receitas = resposta;
        });
        return receitas;
    }
    async listaId(id, id_usuario) {
        var receita = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('receita').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            receita = resposta;
        });
        return receita;
    }
    async salvar(receita) {
        var dados = {};
        var ExisteReceita = 0;
        if (!receita.receita) throw new Validacao('O nome da receita é obrigatorio');
        if (!receita.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from receita a
                            where id_usuario = ${receita.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.receita) = LOWER('${receita.receita}') `).then((resposta) => {
            ExisteReceita = Number(resposta.rows[0].id);
        })
        if (ExisteReceita > 0) {
            throw new Validacao('Essa receita ja esta cadastrado');
        }
        await knex('receita').insert(receita).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...receita
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, receita) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('receita').update(receita).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('receita').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = receitaModel;