const Recebimento = require('../models/RecebimentoModel');

class recebimentoController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const recebimento = new Recebimento();
            const dados = await recebimento.listaAll(id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async listaId(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const recebimento = new Recebimento();
            const dados = await recebimento.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const recebimento = {
                'nome': req.body.nome,
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const rec = new Recebimento();
            const dados = await rec.salvar(recebimento);
            return res.status(201).json(dados);
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async atualizar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            var dados = req.body;
            const recebimento = new Recebimento();
            await recebimento.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const recebimento = new Recebimento();
            await recebimento.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = recebimentoController;