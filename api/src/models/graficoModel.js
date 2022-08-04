const knex = require('../config/database');
const Validacao = require('../middlewares/validacao');

class graficoModel {
    async graficoLancamentosDespesas(id_usuario, ano, mes) {
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
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Entrada'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        VAR.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN despesa_variavel VAR ON LANC.id_despesa_variavel = VAR.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Entrada'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        REC.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN recebimento REC ON LANC.id_recebimento = REC.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Entrada'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        IMP.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN imposto IMP ON LANC.id_imposto = IMP.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Entrada'
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
            and  lanc.tipo <> 'Entrada'
            GROUP BY 1`).then(async (res) => {
            dados = (res.rows)
        });
        return dados;
    }
    async graficoLancamentosRecebimento(id_usuario, ano, mes) {
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
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Saida'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        VAR.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN despesa_variavel VAR ON LANC.id_despesa_variavel = VAR.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Saida'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        REC.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN recebimento REC ON LANC.id_recebimento = REC.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Saida'
                        GROUP BY 1

                        UNION 

                        SELECT 
                        IMP.nome,
                        SUM(LANC.valor) AS VALOR
                        FROM lancamento LANC
                        JOIN imposto IMP ON LANC.id_imposto = IMP.id
            WHERE EXTRACT(month from lanc.data) = ${mes}
            and EXTRACT(year from lanc.data) = ${ano}
            and lanc.id_usuario = ${id_usuario}
            and  lanc.tipo <> 'Saida'
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
            and  lanc.tipo <> 'Saida'
            GROUP BY 1`).then(async (res) => {
            dados = (res.rows)
        });
        return dados;
    }
    async graficoContasPagar(id_usuario, ano, mes) {
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        if (!ano) throw new Validacao('Precisa informar um ano');
        if (!mes) throw new Validacao('Precisa informar um mes');

        var dados = {};
        await knex.raw(`
        SELECT 
        case
            when fixa.nome  <> '' THEN fixa.nome
            when var.nome  <> '' THEN var.nome
            when imp.nome  <> '' THEN imp.nome
            when rec.nome  <> '' THEN rec.nome
            when trans.nome  <> '' THEN trans.nome
        end  as nome,
        sum(pag.valor) as valor
                        FROM contas_pagar PAG
                        LEFT join despesa_fixa fixa on PAG.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on PAG.id_despesa_variavel = var.id
                        LEFT join imposto imp on PAG.id_imposto = imp.id
                        LEFT join recebimento rec on PAG.id_recebimento = rec.id
                        LEFT join transferencia trans on PAG.id_transferencia = trans.id 
        
                    WHERE EXTRACT(month from data_pagamento) = ${mes}
                    and EXTRACT(year from data_pagamento) = ${ano}
                    
                    and pag.id_usuario = ${id_usuario}
                    group by 1`).then((resposta) => {
            dados = resposta.rows;
        });
        return dados;
    }

    async graficoContasReceber(id_usuario, ano, mes) {
        if (!id_usuario) throw new Validacao('Usuario não autorizado');
        if (!ano) throw new Validacao('Precisa informar um ano');
        if (!mes) throw new Validacao('Precisa informar um mes');

        var dados = {};
        await knex.raw(`
        SELECT 
        case
            when fixa.nome  <> '' THEN fixa.nome
            when var.nome  <> '' THEN var.nome
            when imp.nome  <> '' THEN imp.nome
            when rec.nome  <> '' THEN rec.nome
            when trans.nome  <> '' THEN trans.nome
        end  as nome,
        sum(receb.valor) as valor
                    FROM contas_receber receb
                        LEFT join despesa_fixa fixa on receb.id_despesa_fixa = fixa.id
                        LEFT join despesa_variavel var on receb.id_despesa_variavel = var.id
                        LEFT join imposto imp on receb.id_imposto = imp.id
                        LEFT join recebimento rec on receb.id_recebimento = rec.id
                        LEFT join transferencia trans on receb.id_transferencia = trans.id 
        
                    WHERE EXTRACT(month from data_pagamento) = ${mes}
                    and EXTRACT(year from data_pagamento) = ${ano}
                    
                    and receb.id_usuario = ${id_usuario}
                    group by 1`).then(async (resposta) => {
            dados = (resposta.rows)
        });
        return dados;
    }
}

module.exports = graficoModel;