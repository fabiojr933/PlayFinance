
import React, { Component, useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pages from "./views/Pages/Pages";
import Login from './views/Pages/login';
import Register from './views/Pages/register';


import routes from "./routes";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

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

                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
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
}

export default App;

const browserHistory = createBrowserHistory();
