const Lacamento = require('../models/lancamentoModel');

class lacamentoController {
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const lancamento = {
                'observacao': req.body.observacao,
                'valor': req.body.valor,
                'id_usuario': id_usuario,
                'id_receita': req.body.id_receita,
                'id_despesa': req.body.id_despesa,
                'id_cartao': req.body.id_cartao,
                'tipo': req.body.tipo,
                'data': req.body.data
            }
            console.log(lancamento)
            const lanc = new Lacamento();
            const dados = await lanc.salvar(lancamento);
            return res.status(201).json(dados);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: error.error });
        }
    }
    async listaId(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const lancamento = new Lacamento();
            const dados = await lancamento.listaId(id_usuario, id);
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async listaRaw(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const lancamento = new Lacamento();
            const dados = await lancamento.listaRaw(id_usuario, ano, mes);
            return res.status(200).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const lancamento = new Lacamento();
            await lancamento.excluir(id, id_usuario);
            return res.status(200).json({ id })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = lacamentoController;