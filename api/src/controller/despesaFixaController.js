const DespesaFixa = require('../models/despesaFixaModel');

class DespesaFixaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa_fixa = new DespesaFixa();
            const dados = await despesa_fixa.listaAll(id_usuario);
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
            const despesa_fixa = new DespesaFixa();
            const dados = await despesa_fixa.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa_fixa = {
                'nome': req.body.nome,
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new DespesaFixa();
            const dados = await des.salvar(despesa_fixa);
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
            const despesa_fixa = new DespesaFixa();
            await despesa_fixa.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const despesa_fixa = new DespesaFixa();
            await despesa_fixa.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = DespesaFixaController;