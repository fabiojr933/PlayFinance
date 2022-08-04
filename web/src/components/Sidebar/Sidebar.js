
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import "./StyleSheets/Sidebar.css";
function Sidebar(props) {
  const [active, setActive] = useState("");
  const [dropdownToggle, setDropDownToggle] = useState(false);
  const [dropdownToggle2, setDropDownToggle2] = useState(false);
  const [dropdownToggle3, setDropDownToggle3] = useState(false);
  const [dropdownToggle4, setDropDownToggle4] = useState(false);
  const [dropdownToggle5, setDropDownToggle5] = useState(false);

  useEffect(() => {
    setActive(props.location.pathname);
  }, [props.location.pathname, active]);

  return (
    <div
      className="sidebar-container border-right main-sidebar"
      id="sticky-sidebar"
    >
      <nav id="sidebar" className={props.toggleClass}>
        <ul className="list-unstyled components">
          <li
            className={active === "/dashio-admin/dashboard" ? "active" : null}
          >
            <a href="/dashio-admin/dashboard">
              <div className="menu-icon">
                <i className="fa fa-home nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>


          {/*  Meus menu */}

          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle2(!dropdownToggle2)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-plus-circle"></i>Cadastros
            </a>
            <ul
              className={
                dropdownToggle2
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >

              <li
                className={
                  active === "/dashboard/despesa-fixa"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/despesa-fixa">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Despesa Fixa</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/despesa-variavel"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/despesa-variavel">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Despesa Variavel</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/recebimento"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/recebimento">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Recebimento</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/transferencia"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/transferencia">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Transferencia</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/imposto"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/imposto">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Imposto</span>
                </Link>
              </li>



              <li
                className={
                  active === "/dashboard/conta"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/conta">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Conta bancaria</span>
                </Link>
              </li>


            </ul>
          </li>



          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle3(!dropdownToggle3)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-check-square-o nav_icon"></i>Financeiro
            </a>
            <ul
              className={
                dropdownToggle3
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >

              <li
                className={
                  active === "/dashboard/financeiro/lancamento"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/lancamento">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Lançamento</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/contas-pagar/baixa"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/contas-pagar/baixa">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Baixa doc Pagar</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/contas-receber/baixa"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/contas-receber/baixa">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Baixa doc Receber</span>
                </Link>
              </li>



            </ul>
          </li>





          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle4(!dropdownToggle4)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-check-square-o nav_icon"></i>Relatorio
            </a>
            <ul
              className={
                dropdownToggle4
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >

              <li
                className={
                  active === "/dashboard/financeiro/lancamento"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/relatorio">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Lançamentos</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/contas-pagar"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/contas-pagar">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Doc a pagar e pagos</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/o/contas-receber"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/contas-receber">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Doc a receber e recebido</span>
                </Link>
              </li>
            </ul>
          </li>






          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle5(!dropdownToggle5)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-check-square-o nav_icon"></i>Graficos
            </a>
            <ul
              className={
                dropdownToggle5
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >

              <li
                className={
                  active === "/dashboard/financeiro/grafico/lancamentos"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/grafico/lancamentos">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Lançamentos</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/grafico/contas-pagar"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/grafico/contas-pagar">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Contas pagar</span>
                </Link>
              </li>

              <li
                className={
                  active === "/dashboard/financeiro/grafico/contas-receber"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/financeiro/grafico/contas-receber">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Contas receber</span>
                </Link>
              </li>


            </ul>
          </li>

        </ul>

      </nav>
    </div>
  );
}

export default withRouter(Sidebar);
