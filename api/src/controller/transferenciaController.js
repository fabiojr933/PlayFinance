const Transferencia = require('../models/transfereciaModel');

class TransferenciaController {
    async listaAll(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const transferencia = new Transferencia();
            const dados = await transferencia.listaAll(id_usuario);
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
            const transferencia = new Transferencia();
            const dados = await transferencia.listaId(id, id_usuario);
            return res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const transferencia = {
                'nome': req.body.nome.trim(),
                'status': 'Ativo',
                'id_usuario': id_usuario
            };
            const des = new Transferencia();
            const dados = await des.salvar(transferencia);
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
            const transferencia = new Transferencia();
            await transferencia.atualizar(id, id_usuario, dados);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const transferencia = new Transferencia();
            await transferencia.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = TransferenciaController;