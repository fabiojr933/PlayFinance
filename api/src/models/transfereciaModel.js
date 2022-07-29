const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class transfereciaModel {
    async listaAll(id_usuario) {
        var transferencia = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('transferencia').where({ 'id_usuario': id_usuario, status: 'Ativo' }).select('*').orderBy('id', 'asc').then((resposta) => {
            transferencia = resposta;
        });
        return transferencia;
    }
    async listaId(id, id_usuario) {
        var transferencia = {};
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        await knex('transferencia').where({ 'id': id, 'id_usuario': id_usuario, status: 'Ativo' }).select('*').then((resposta) => {
            transferencia = resposta;
        });
        return transferencia;
    }
    async salvar(transferencia) {
        var dados = {};
        var Existetransferencia = 0;
        if (!transferencia.nome) throw new Validacao('O nome da transferencia é obrigatorio');
        if (!transferencia.id_usuario) throw new Validacao('Usuario não Autorizado');

        await knex.raw(`select 
                            count(id)as id
                            from transferencia a
                            where id_usuario = ${transferencia.id_usuario}  
                            and status = 'Ativo'
                            and LOWER(a.nome) = LOWER('${transferencia.nome}') `).then((resposta) => {
            Existetransferencia = Number(resposta.rows[0].id);
        })
        if (Existetransferencia > 0) {
            throw new Validacao('Esse transferencia ja esta cadastrado');
        }
        await knex('transferencia').insert(transferencia).returning('id').then((resposta) => {
            dados = {
                'id': resposta[0].id,
                ...transferencia
            }
        });
        return dados;
    }
    async atualizar(id, id_usuario, transferencia) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('transferencia').update(transferencia).where({ id: id, id_usuario: id_usuario });
    }
    async excluir(id, id_usuario) {
        if (!id_usuario) throw new Validacao('Usuario não Autorizado');
        if (!id) throw new Validacao('É preciso informar um usuario');
        await knex('transferencia').del().where({ id: id, id_usuario: id_usuario });
    }
}

module.exports = transfereciaModel;