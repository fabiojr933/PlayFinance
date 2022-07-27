const Validacao = require('../middlewares/validacao');
const env = require('dotenv');
const knex = require('../config/database');
const jwt = require('jwt-simple');
const brcrypt = require('bcryptjs');
env.config();

class usuarioModel {
    async salvar(usuario) {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        if (!emailRegex.test(usuario.email)) throw new Validacao('Esse email não é valido');
        if (!usuario.nome) throw new Validacao('Nome é obrigatorio');
        if (!usuario.email) throw new Validacao('Email é obrigatorio');
        if (!usuario.senha) throw new Validacao('Senha é obrigatorio');
        let token = jwt.encode(usuario.email, process.env.SEGREDO);
        let salto = brcrypt.genSaltSync(10);
        usuario.senha = brcrypt.hashSync(usuario.senha, salto);
        let dados = {
            ...usuario,
            'token': token
        };
        await knex('usuario').count('email as email').where({ email: dados.email }).then((resposta) => {
            if (resposta[0].email > 0) {
                throw new Validacao('Esse email já esta cadastrado');
            }
        });
        await knex('usuario').insert(dados).returning('id').then((ultimoId) => {
            knex('receita').insert([
                { receita: 'Outros', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Beneficios', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Comissão', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Pagamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Rendimentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Serviços', status: 'Ativo', id_usuario: ultimoId[0].id },
                { receita: 'Vendas', status: 'Ativo', id_usuario: ultimoId[0].id },
            ]).then((receita) => {
                knex('despesa').insert([
                    { despesa: 'Alimentação', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Carro', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Educação', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Familia', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Moradia', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Pagamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Saúde', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Serviços', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Transporte', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Vestuario', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Viagens', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Taxas', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Tazer', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { despesa: 'Assinaturas', status: 'Ativo', id_usuario: ultimoId[0].id },
                ]).then((despesa) => {
                    knex('cartao').insert([
                        { cartao: 'Carteira', tipo: 'Debito', saldo: 898999, conta: '9999', status: 'Ativo', id_usuario: ultimoId[0].id },
                    ]).then((despesa) => {
                    });
                });
            });
        });
    }
    async alterar(usuario, id) {
        if (!id) throw new Validacao("É obrigado informar o usuario");
        if (!usuario.senha) throw new Validacao("Alterar qualquer dados do cadastro, a senha é obrigatorio alterar tambem");
        var salto = brcrypt.genSaltSync(10);
        usuario.senha = brcrypt.hashSync(usuario.senha, salto);
        var dados = {
            ...usuario,
        };
        await knex('usuario').count('id as id').where({ id: id }).then((resposta) => {
            if (!resposta[0].id == 1) {
                throw new Validacao('Esse email não existe');
            }
            knex('usuario').update(dados).where({ id: id });
        });
    }
    async login(usuario) {
        var dados = {};
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
        if (!emailRegex.test(usuario.email)) throw new Validacao('Esse email não é valido');
        if (!usuario.email) throw new Validacao('É obrigatorio informar o email');
        if (!usuario.senha) throw new Validacao('É obrigatorio informar a senha');
        await knex('usuario').where({ email: usuario.email }).first().then((resposta) => {
            if (resposta === undefined) {
                throw new Validacao('Email não encontrado');
            }
            if (brcrypt.compareSync(usuario.senha, resposta.senha)) {
                dados = {
                    id: resposta.id,
                    email: resposta.email,
                    token: resposta.token
                }
            } else {
                throw new Validacao('Senha invalida');
            }
        });
        return dados;
    }
}
module.exports = usuarioModel;