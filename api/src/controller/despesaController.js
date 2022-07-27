const Despesa = require('../models/despesaModel');

class DespesaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa = new Despesa();
            const dados = await despesa.listaAll(id_usuario);
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
            const despesa = new Despesa();
            const dados = await despesa.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa = {
                'despesa': req.body.despesa.trim(),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Despesa();
            const dados = await des.salvar(despesa);
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
            const despesa = new Despesa();
            await despesa.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const despesa = new Despesa();
            await despesa.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = DespesaController;