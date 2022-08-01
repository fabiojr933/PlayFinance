
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
                  active === "/dashboard/financeiro/lancamento"
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
                  
            

              
            </ul>
          </li>






          <li
            className="menu-item-has-children dropdown"
            onClick={() => setDropDownToggle(!dropdownToggle)}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="menu-icon fa fa-cogs"></i>Components
            </a>
            <ul
              className={
                dropdownToggle
                  ? "sub-menu children dropdown-menu show"
                  : "sub-menu children dropdown-menu"
              }
            >
              <li
                className={
                  active === "/dashio-admin/components/buttons"
                    ? "active"
                    : null
                }
              >
                <a href="/dashio-admin/components/buttons">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Buttons</span>
                </a>
              </li>
              <li
                className={
                  active === "/dashio-admin/components/badge" ? "active" : null
                }
              >
                <a href="/dashio-admin/components/badge">
                  <div className="menu-icon">
                    <i className="fa fa-id-badge"></i>
                  </div>
                  <span className="menu-title">Badges</span>
                </a>
              </li>
              <li
                className={
                  active === "/dashio-admin/components/card" ? "active" : null
                }
              >
                <a href="/dashio-admin/components/card">
                  <div className="menu-icon">
                    <i className="fa fa-id-card-o"></i>
                  </div>
                  <span className="menu-title">Cards</span>
                </a>
              </li>

              <li
                className={
                  active === "/dashio-admin/components/alert" ? "active" : null
                }
              >
                <a href="/dashio-admin/components/alert">
                  <div className="menu-icon">
                    <i className="fa fa-exclamation-triangle"></i>
                  </div>
                  <span className="menu-title">Alerts</span>
                </a>
              </li>
              <li
                className={
                  active === "/dashio-admin/components/progressbar"
                    ? "active"
                    : null
                }
              >
                <a href="/dashio-admin/components/progressbar">
                  <div className="menu-icon">
                    <i className="fa fa-tasks"></i>
                  </div>
                  <span className="menu-title">Progress Bars</span>
                </a>
              </li>

              <li
                className={
                  active === "/dashio-admin/components/loader" ? "active" : null
                }
              >
                <a href="/dashio-admin/components/loader">
                  <div className="menu-icon">
                    <i className="fa fa-spinner"></i>
                  </div>
                  <span className="menu-title">Loader</span>
                </a>
              </li>
            </ul>
          </li>






          {/* <li className={active === "/widgets" ? "active" : null}>
            <a href="/widgets">
              <div className="menu-icon">
                <i className="fa fa-th-large nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Widgets</span>
            </a>   fa fa-book nav_icon
          </li> */}

          <li className={active === "/dashboard/lancamento" ? "active" : null}>
            <a href="/dashboard/lancamento">
              <div className="menu-icon">
                <i
                  className="fa fa-check-square-o nav_icon"
                  aria-hidden="true"
                ></i>
              </div>
              <span className="menu-title">Forms</span>
            </a>
          </li>

          <li className={active === "/dashio-admin/tables" ? "active" : null}>
            <a href="/dashio-admin/tables">
              <div className="menu-icon">
                <i className="fa fa-table nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Tables</span>
            </a>
          </li>

          <li className={active === "/dashio-admin/pages" ? "active" : null}>
            <a href="/dashio-admin/pages">
              <div className="menu-icon">
                <i
                  className="fa fa-file-text-o nav_icon"
                  aria-hidden="true"
                ></i>
              </div>
              <span className="menu-title">Pages</span>
            </a>
          </li>

          <li className={active === "/dashio-admin/charts" ? "active" : null}>
            <a href="/dashio-admin/charts">
              <div className="menu-icon">
                <i className="fa fa-bar-chart nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Charts</span>
            </a>
          </li>
        </ul>

        {/* <ul className="list-unstyled CTAs">
              <li>
                <a
                  href="https://bootstrapious.com/tutorial/files/sidebar.zip"
                  className="download"
                >
                  Download source
                </a>
              </li>
              <li>
                <a
                  href="https://bootstrapious.com/p/bootstrap-sidebar"
                  className="article"
                >
                  Back to article
                </a>
              </li>
      </ul> */}
      </nav>
    </div>
  );
}

export default withRouter(Sidebar);
