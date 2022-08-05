
import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pages from "./views/Pages/Pages";
import Login from './views/Pages/login';
import Register from './views/Pages/register';


import routes from "./routes";



const App = () => {

  const [usuarioLogin, setUsuarioLogin] = useState(null);

  useEffect(() => {
    let usuario = localStorage.getItem('@usuario');
    setUsuarioLogin(usuario);
  }, [])

  return (
    <div>
      <Router
        basename={process.env.REACT_APP_BASENAME || ""}
        history={browserHistory}
      >
        <ToastContainer autoClose={4000} style={{ zIndex: 9999999 }} />
        <Switch>
          { }
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/register"> <Register /> </Route>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <>
                      {!usuarioLogin ? <Redirect to='/login' /> :
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>}
                    </>
                  );
                }}
              />
            );
          })}
          <Route Redirect to="/PageNotFound" exact component={Pages} />
        </Switch>
      </Router>
    </div>
  );
}


export default App;

const browserHistory = createBrowserHistory();
