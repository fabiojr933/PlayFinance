const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class despesaFixa {
    async listaAll(id_usuario) {
        var despesa_fixa = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('despesa_fixa').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            despesa_fixa = resposta;
        })
        return despesa_fixa;
    }
    async listaId(id, id_usuario) {
        var despesa_fixa = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('despesa_fixa').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            despesa_fixa = resposta;
        })
        return despesa_fixa;
    }
    async salvar(despesa_fixa) {
        var dados = {};
        var ExisteDespesa = 0;
        if (!despesa_fixa.nome) throw new Validacao('O nome da despesa é obrigatorio');
        if (!despesa_fixa.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from despesa_fixa a
                            where id_usuario = ${despesa_fixa.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.nome) = LOWER('${despesa_fixa.nome}') `).then((resposta) => {
            ExisteDespesa = Number(resposta.rows[0].id);
        })
        if (ExisteDespesa > 0) {
            throw new Validacao('Essa Despesa ja esta cadastrado');
        }
        await knex('despesa_fixa').insert(despesa_fixa).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...despesa_fixa
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, despesa_fixa) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('despesa_fixa').update(despesa_fixa).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('despesa_fixa').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = despesaFixa;