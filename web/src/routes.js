import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { BaseLayout } from "./layouts";
// Route Views
import Dashboard from "./views/Dashboard/Dashboard";
import Buttons from "./views/Components/ButtonsContainer";
import Badge from "./views/Components/BadgeContainer";
import Card from "./views/Components/CardsContainer";
import Alert from "./views/Components/AlertContainer";
import ProgressBar from "./views/Components/ProgressBarContainer";
import Loader from "./views/Components/LoaderContainer";
import UIElements from "./views/UIElements/UIElements";
import Widgets from "./views/Widgets/WidgetsContainer";
import Forms from "./views/Forms/Forms";
import Tables from "./views/Tables/Tables";
import Pages from "./views/Pages/Pages";
import Charts from "./views/Charts/Charts";


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

  {
    path: "/dashio-admin/components/buttons",
    layout: BaseLayout,
    component: Buttons,
  },

  {
    path: "/dashio-admin/components/badge",
    layout: BaseLayout,
    component: Badge,
  },

  {
    path: "/dashio-admin/components/card",
    layout: BaseLayout,
    component: Card,
  },
  {
    path: "/dashio-admin/components/alert",
    layout: BaseLayout,
    component: Alert,
  },
  {
    path: "/dashio-admin/components/progressbar",
    layout: BaseLayout,
    component: ProgressBar,
  },
  {
    path: "/dashio-admin/components/loader",
    layout: BaseLayout,
    component: Loader,
  },

  {
    path: "/dashio-admin/ui-elements",
    layout: BaseLayout,
    component: UIElements,
  },
  {
    path: "/dashio-admin/widgets",
    layout: BaseLayout,
    component: Widgets,
  },
  {
    path: "/dashio-admin/forms",
    layout: BaseLayout,
    component: Forms,
  },
  {
    path: "/dashio-admin/tables",
    layout: BaseLayout,
    component: Tables,
  },
  {
    path: "/dashio-admin/pages",
    layout: BaseLayout,
    component: Pages,
  },

  {
    path: "/dashio-admin/charts",
    layout: BaseLayout,
    component: Charts,
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
  }




];

export default routes;
