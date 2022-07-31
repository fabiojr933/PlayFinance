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
            knex('recebimento').insert([
                { nome: 'Adiantamento', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Cobrança', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Comissão', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Empréstimo', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Mensalidade', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Rendimentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Salário', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Serviços', status: 'Ativo', id_usuario: ultimoId[0].id },
                { nome: 'Vendas', status: 'Ativo', id_usuario: ultimoId[0].id },
            ]).then((recebimento) => {
                knex('despesa_fixa').insert([
                    { nome: '13º Salário', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Água e esgoto', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Assessorias e Associações', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Assistência odontológica', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Comissão de vendedores', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Contabilidade', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Energia elétrica', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Internet', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Investimentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Juros', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Limpeza', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Manutenção de equipamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Publicidade', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Taxas bancárias', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Telefone celular', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Telefone fixo', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Vale Alimentação', status: 'Ativo', id_usuario: ultimoId[0].id },
                    { nome: 'Vale Transporte', status: 'Ativo', id_usuario: ultimoId[0].id },
                ]).then((despesa_fixa) => {
                    knex('conta').insert([
                        { nome: 'Carteira', saldo: 0.1, conta: '9999', status: 'Ativo', id_usuario: ultimoId[0].id },
                    ]).then((conta) => {
                        knex('despesa_variavel').insert([
                            { nome: 'Alimentação', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Aquisição de equipamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Cartório', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Combustível', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Horas Extras', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Impressos', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Matéria Prima', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Material de escritório', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Passagem aéreas', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Rescisões trabalhistas', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Treinamentos', status: 'Ativo', id_usuario: ultimoId[0].id },
                            { nome: 'Viagens', status: 'Ativo', id_usuario: ultimoId[0].id },
                        ]).then((despesa_variavel) => {
                            knex('imposto').insert([
                                { nome: 'Alvará', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'Cofins', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'CSLL', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'FGTS', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'GPS', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'ICMS', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'Imposto de Renda', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IOF', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IPI', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IPTU', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IPVA', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IR', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IRPJ', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'IRRF', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'ISS', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'Juros', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'PIS', status: 'Ativo', id_usuario: ultimoId[0].id },
                                { nome: 'Simples Nacional', status: 'Ativo', id_usuario: ultimoId[0].id },
                            ]).then((imposto) => {
                                knex('transferencia').insert([
                                    { nome: 'Investimento', status: 'Ativo', id_usuario: ultimoId[0].id },
                                ]).then((transferencia) => {
                                });
                            });
                        });
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