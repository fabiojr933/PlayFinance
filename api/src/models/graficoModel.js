const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class graficoModel {
    async graficoLancamentos(id_usuario, ano, mes) {
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        if (!ano) throw new Validacao('Precisa informar um ano');
        if (!mes) throw new Validacao('Precisa informar um mes');
        var dados = {};
        await knex.raw(`
            SELECT 
                        FIXA.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN despesa_fixa FIXA ON LANC.id_despesa_fixa = FIXA.id
                        GROUP BY 1

                        UNION 

                        SELECT 
                        VAR.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN despesa_variavel VAR ON LANC.id_despesa_variavel = VAR.id
                        GROUP BY 1

                        UNION 

                        SELECT 
                        REC.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN recebimento REC ON LANC.id_recebimento = REC.id
                        GROUP BY 1

                        UNION 

                        SELECT 
                        IMP.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN imposto IMP ON LANC.id_imposto = IMP.id
                        GROUP BY 1

                        UNION 

                        SELECT 
                        TRA.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN transferencia TRA ON LANC.id_transferencia = TRA.id                       

            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            GROUP BY 1`).then(async (res) => {
           dados = (res.rows)
        });
        return dados;
    }
}

module.exports = graficoModel;