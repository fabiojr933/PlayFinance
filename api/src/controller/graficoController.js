const Grafico = require('../models/graficoModel');

class graficoController {
    async graficoLancamentosDespesas(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const graf = new Grafico();
            const dados = await graf.graficoLancamentosDespesas(id_usuario, ano, mes);
            res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
    async graficoLancamentosRecebimento(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const graf = new Grafico();
            const dados = await graf.graficoLancamentosRecebimento(id_usuario, ano, mes);
            res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }

    async graficoLancContasPagar(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const graf = new Grafico();
            const dados = await graf.graficoContasPagar(id_usuario, ano, mes);
            res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }

    async graficoLancContasReceber(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const graf = new Grafico();
            console.log(id_usuario, ano, mes);
            const dados = await graf.graficoContasReceber(id_usuario, ano, mes);
            res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = graficoController;