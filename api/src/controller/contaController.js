const Conta = require('../models/ContaModel');

class ContaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const conta = new Conta();
            const dados = await conta.listaAll(id_usuario);
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
            const conta = new Conta();
            const dados = await conta.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const data = {
                'nome': req.body.nome.trim(),
                'tipo': req.body.tipo.trim(),
                'saldo': req.body.saldo,
                'conta': req.body.conta,
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const cont = new Conta();
            const dados = await cont.salvar(data);
            return res.status(201).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async atualizar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            var dados = req.body;
            const conta = new Conta();
            await conta.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const conta = new Conta();
            await conta.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = ContaController;