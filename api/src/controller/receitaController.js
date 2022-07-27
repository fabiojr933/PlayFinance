const Receita = require('../models/receitaModel');

class receitaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const receita = new Receita();
            const dados = await receita.listaAll(id_usuario);
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
            const receita = new Receita();
            const dados = await receita.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const receita = {
                'receita': req.body.receita.trim(),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Receita();
            const dados = await des.salvar(receita);
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
            const receita = new Receita();
            await receita.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const receita = new Receita();
            await receita.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = receitaController;