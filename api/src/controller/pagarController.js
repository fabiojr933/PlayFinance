var contasPagar = require('../models/pagarModel');

class PagarController {
    async listaAll(req, res) {
        const id_usuario = req.id_usuario;
        const pag = new contasPagar();
        const dados = await pag.listaAll(id_usuario);
        return res.status(200).json(dados);
    }
    async listaAllPendente(req, res) {
        const id_usuario = req.id_usuario;
        const pag = new contasPagar();
        const dados = await pag.listaAllPendente(id_usuario);
        return res.status(200).json(dados);
    }
    async salvar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const pagar = {
                'observacao': req.body.observacao.trim(),
                'status': req.body.status.trim(),
                'data_lancamento': req.body.data_lancamento,
                'vencimento': req.body.vencimento,
                'qtde_parcela': req.body.qtde_parcela,
                'valor': req.body.valor,
                'valor': req.body.valor,
                "dia_vencimento": req.body.dia_vencimento,
                'id_usuario': id_usuario,
                'id_recebimento': req.body.id_recebimento,
                'id_despesa_fixa': req.body.id_despesa_fixa,
                'id_despesa_variavel': req.body.id_despesa_variavel,
                'id_conta': req.body.id_conta,
                'id_imposto': req.body.id_imposto,
                'id_transferencia': req.body.id_transferencia
            };
            const pag = new contasPagar();
            const data = await pag.salvar(pagar);
            return res.status(201).json(data);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async excluir(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const pag = new contasPagar();
            await pag.excluir(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async baixa(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const id = req.params.id;
            const pag = new contasPagar();
            await pag.baixa(id, id_usuario);
            return res.status(200).json({ id });
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = PagarController;