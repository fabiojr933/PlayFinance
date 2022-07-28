
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import "./StyleSheets/Sidebar.css";
function Sidebar(props) {
  const [active, setActive] = useState("");
  const [dropdownToggle, setDropDownToggle] = useState(false);
  const [dropdownToggle2, setDropDownToggle2] = useState(false);

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
                  active === "/dashboard/receita"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/receita">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Cadastro de receita</span>
                </Link>
              </li>
                
              <li
                className={
                  active === "/dashboard/despesa"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/despesa">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Cadastro de despesa</span>
                </Link>
              </li>
             
                  
              <li
                className={
                  active === "/dashboard/cartao"
                    ? "active"
                    : null
                }
              >
                <Link to="/dashboard/cartao">
                  <div className="menu-icon">
                    <i className="fa fa-puzzle-piece"></i>
                  </div>
                  <span className="menu-title">Cadastro conta bancaria</span>
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






          <li
            className={active === "/dashio-admin/ui-elements" ? "active" : null}
          >
            <a href="/dashio-admin/ui-elements">
              <div className="menu-icon">
                <i className="fa fa-book nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">UI Elements </span>
            </a>
          </li>

          {/* <li className={active === "/widgets" ? "active" : null}>
            <a href="/widgets">
              <div className="menu-icon">
                <i className="fa fa-th-large nav_icon" aria-hidden="true"></i>
              </div>
              <span className="menu-title">Widgets</span>
            </a>
          </li> */}

          <li className={active === "/dashio-admin/forms" ? "active" : null}>
            <a href="/dashio-admin/forms">
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
