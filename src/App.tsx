import React, { useEffect } from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './Main';
import Block from './Block';

function App() {
  return (
    <Router>
      <Container fluid>
        <Switch>
          <Route path="/:id" exact>
            <Block />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
