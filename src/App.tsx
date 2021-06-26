import React from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from "react-redux";
import Main from './Main';
import Block from './Block';
import NavbarComponent from './NavbarComponent';
import Transactions from './Transactions';
import {store} from "./store/store";

function App() {
  return (
      <Provider store={store}>
        <Router>
          <Container fluid>
            <NavbarComponent />
            <Switch>
              <Route path="/:id/transactions" exact>
                <Transactions />
              </Route>
              <Route path="/:id" exact>
                <Block />
              </Route>
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </Container>
        </Router>
      </Provider>

  );
}

export default App;
