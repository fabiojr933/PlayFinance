const DespesaVariavel = require('../models/DespesaVariavelModel');

class DespesaVariavelController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa_variavel = new DespesaVariavel();
            const dados = await despesa_variavel.listaAll(id_usuario);
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
            const despesa_variavel = new DespesaVariavel();
            const dados = await despesa_variavel.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const despesa_variavel = {
                'nome': req.body.nome.trim(),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new DespesaVariavel();
            const dados = await des.salvar(despesa_variavel);
            return res.status(201).json(dados);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.error });
        }
    }
    async atualizar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            var dados = req.body;
            const despesa_variavel = new DespesaVariavel();
            await despesa_variavel.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const despesa_variavel = new DespesaVariavel();
            await despesa_variavel.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = DespesaVariavelController;