const Grafico = require('../models/graficoModel');

class graficoController {
    async graficoLancamentos(req, res) {
        try {
            const id_usuario = req.id_usuario;
            const ano = req.params.ano;
            const mes = req.params.mes;
            const graf = new Grafico();
            const dados = await graf.graficoLancamentos(id_usuario, ano, mes);
            res.status(200).json(dados);
        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: error.error });
        }
    }
}

module.exports = graficoController;