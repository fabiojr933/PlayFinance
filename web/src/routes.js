import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { BaseLayout } from "./layouts";
// Route Views
import Dashboard from "./views/Dashboard/Dashboard";



//Meus
import DespesaFixaIndex from './views/Pages/despesaFixa';
import DespesaFixaEdit from './views/Pages/despesaFixa/edit';
import DespesaFixaNew from './views/Pages/despesaFixa/new';

import DespesaVariavelIndex from './views/Pages/despesaVariavel';
import DespesaVariavelEdit from './views/Pages/despesaVariavel/edit';
import DespesaVariavelNew from './views/Pages/despesaVariavel/new';

import recebimentoIndex from './views/Pages/recebimento';
import recebimentoEdit from './views/Pages/recebimento/edit';
import recebimentoNew from './views/Pages/recebimento/new';


import transferenciaIndex from './views/Pages/transferencia';
import transferenciaEdit from './views/Pages/transferencia/edit';
import transferenciaNew from './views/Pages/transferencia/new';

import impostoIndex from './views/Pages/imposto';
import impostoEdit from './views/Pages/imposto/edit';
import impostoNew from './views/Pages/imposto/new';

import contaIndex from './views/Pages/conta';
import contaEdit from './views/Pages/conta/edit';
import contaNew from './views/Pages/conta/new';

import LancamentoIndex from './views/Pages/lancamento';
import LancamentoNovo from './views/Pages/lancamento/new';

import Relatorio from './views/Pages/relatorio';

import PagarNew from "./views/Pages/pagar/new";
import PagarBaixa from './views/Pages/pagar/pagar';
import PagarIndex from './views/Pages/pagar/index';

import ReceberNew from "./views/Pages/receber/new";
import ReceberBaixa from './views/Pages/receber/receber';
import ReceberIndex from './views/Pages/receber/index';

import GraficoContasPagar from './views/Pages/graficos/contas_pagar'
import GraficoContasReceber from './views/Pages/graficos/contas_receber'
import GraficoIndex from './views/Pages/graficos/index';


  var routes = [
    {
      path: "/dashio-admin",
      exact: true,
      layout: BaseLayout,
      component: () => <Redirect to="/dashio-admin/dashboard" />,
    },
    {
      path: "/dashio-admin/dashboard",
      layout: BaseLayout,
      component: Dashboard,
    },



    //Meus

    {
      path: "/dashboard/despesa-fixa/novo",
      layout: BaseLayout,
      component: DespesaFixaNew,
    },
    {
      path: "/dashboard/despesa-fixa/editar/:id",
      layout: BaseLayout,
      component: DespesaFixaEdit,
    },
    {
      path: "/dashboard/despesa-fixa",
      layout: BaseLayout,
      component: DespesaFixaIndex,
    },

    {
      path: "/dashboard/despesa-variavel/novo",
      layout: BaseLayout,
      component: DespesaVariavelNew,
    },
    {
      path: "/dashboard/despesa-variavel/editar/:id",
      layout: BaseLayout,
      component: DespesaVariavelEdit,
    },
    {
      path: "/dashboard/despesa-variavel",
      layout: BaseLayout,
      component: DespesaVariavelIndex,
    },

    {
      path: "/dashboard/recebimento/novo",
      layout: BaseLayout,
      component: recebimentoNew,
    },
    {
      path: "/dashboard/recebimento/editar/:id",
      layout: BaseLayout,
      component: recebimentoEdit,
    },
    {
      path: "/dashboard/recebimento",
      layout: BaseLayout,
      component: recebimentoIndex,
    },
    {
      path: "/dashboard/conta/novo",
      layout: BaseLayout,
      component: contaNew,
    },
    {
      path: "/dashboard/conta/editar/:id",
      layout: BaseLayout,
      component: contaEdit,
    },
    {
      path: "/dashboard/conta",
      layout: BaseLayout,
      component: contaIndex,
    },
    {
      path: "/dashboard/financeiro/lancamento/novo",
      layout: BaseLayout,
      component: LancamentoNovo,
    },
    {
      path: "/dashboard/financeiro/lancamento",
      layout: BaseLayout,
      component: LancamentoIndex,
    },
    ,
    {
      path: "/dashboard/transferencia/novo",
      layout: BaseLayout,
      component: transferenciaNew,
    },
    {
      path: "/dashboard/transferencia/editar/:id",
      layout: BaseLayout,
      component: transferenciaEdit,
    },

    {
      path: "/dashboard/transferencia",
      layout: BaseLayout,
      component: transferenciaIndex,
    }

    ,
    {
      path: "/dashboard/imposto/novo",
      layout: BaseLayout,
      component: impostoNew,
    },
    {
      path: "/dashboard/imposto/editar/:id",
      layout: BaseLayout,
      component: impostoEdit,
    },

    {
      path: "/dashboard/imposto",
      layout: BaseLayout,
      component: impostoIndex,
    },

    {
      path: "/dashboard/financeiro/relatorio",
      layout: BaseLayout,
      component: Relatorio,
    },

    {
      path: "/dashboard/financeiro/contas-pagar/novo",
      layout: BaseLayout,
      component: PagarNew,
    },
    {
      path: "/dashboard/financeiro/contas-pagar/baixa",
      layout: BaseLayout,
      component: PagarBaixa,
    },
    {
      path: "/dashboard/financeiro/contas-pagar",
      layout: BaseLayout,
      component: PagarIndex,
    },

    {
      path: "/dashboard/financeiro/contas-receber/novo",
      layout: BaseLayout,
      component: ReceberNew,
    },
    {
      path: "/dashboard/financeiro/contas-receber/baixa",
      layout: BaseLayout,
      component: ReceberBaixa,
    },
    {
      path: "/dashboard/financeiro/contas-receber",
      layout: BaseLayout,
      component: ReceberIndex,
    },
    {
      path: "/dashboard/financeiro/grafico/contas-pagar",
      layout: BaseLayout,
      component: GraficoContasPagar,
    },
    {
      path: "/dashboard/financeiro/grafico/contas-receber",
      layout: BaseLayout,
      component: GraficoContasReceber,
    },
    {
      path: "/dashboard/financeiro/grafico/lancamentos",
      layout: BaseLayout,
      component: GraficoIndex,
    }
  ];
export default routes;
