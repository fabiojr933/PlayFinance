const Imposto = require('../models/impostoModel');

class ImpostoController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const imposto = new Imposto();
            const dados = await imposto.listaAll(id_usuario);
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
            const imposto = new Imposto();
            const dados = await imposto.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const imposto = {
                'nome': req.body.nome,
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Imposto();
            const dados = await des.salvar(imposto);
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
            const imposto = new Imposto();
            await imposto.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const imposto = new Imposto();
            await imposto.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = ImpostoController;