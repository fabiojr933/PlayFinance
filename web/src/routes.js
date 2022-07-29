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
import ReceitaIndex from './views/Pages/receita';
import ReceitaEdit from './views/Pages/receita/edit';
import ReceitaNew from './views/Pages/receita/new';

import DespesaIndex from './views/Pages/despesa';
import DespesaEdit from './views/Pages/despesa/edit';
import DespesaNew from './views/Pages/despesa/new';

import CartaoIndex from './views/Pages/cartao';
import CartaoEdit from './views/Pages/cartao/edit';
import CartaoNew from './views/Pages/cartao/new';

import LancamentoIndex from './views/Pages/lancamento';
import LancamentoNovo from './views/Pages/lancamento/new';

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
    path: "/dashboard/receita/novo",
    layout: BaseLayout,
    component: ReceitaNew,
  },
  {
    path: "/dashboard/receita/editar/:id",
    layout: BaseLayout,
    component: ReceitaEdit,
  },
  {
    path: "/dashboard/receita",
    layout: BaseLayout,
    component: ReceitaIndex,
  },

  {
    path: "/dashboard/despesa/novo",
    layout: BaseLayout,
    component: DespesaNew,
  },
  {
    path: "/dashboard/despesa/editar/:id",
    layout: BaseLayout,
    component: DespesaEdit,
  },
  {
    path: "/dashboard/despesa",
    layout: BaseLayout,
    component: DespesaIndex,
  },

  {
    path: "/dashboard/cartao/novo",
    layout: BaseLayout,
    component: CartaoNew,
  },
  {
    path: "/dashboard/cartao/editar/:id",
    layout: BaseLayout,
    component: CartaoEdit,
  },
  {
    path: "/dashboard/cartao",
    layout: BaseLayout,
    component: CartaoIndex,
  },
  {
    path: "/dashboard/lancamento/novo",
    layout: BaseLayout,
    component: LancamentoNovo,
  },
  {
    path: "/dashboard/lancamento",
    layout: BaseLayout,
    component: LancamentoIndex,
  },



];

export default routes;
