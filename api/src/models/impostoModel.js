const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class impostoModel {
    async listaAll(id_usuario) {
        var imposto = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('imposto').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            imposto = resposta;
        })
        return imposto;
    }
    async listaId(id, id_usuario) {
        var imposto = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('imposto').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            imposto = resposta;
        })
        return imposto;
    }
    async salvar(imposto) {
        var dados = {};
        var ExisteDespesa = 0;
        if (!imposto.nome) throw new Validacao('O nome do imposto é obrigatorio');
        if (!imposto.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from imposto a
                            where id_usuario = ${imposto.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.nome) = LOWER('${imposto.nome}') `).then((resposta) => {
            ExisteDespesa = Number(resposta.rows[0].id);
        })
        if (ExisteDespesa > 0) {
            throw new Validacao('Essa Despesa ja esta cadastrado');
        }
        await knex('imposto').insert(imposto).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...imposto
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, imposto) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('imposto').update(imposto).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('imposto').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = impostoModel;