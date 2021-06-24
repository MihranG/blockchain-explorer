import React , {useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Button, Container} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Main from "./Main";
import Block from "./Block";


function App() {
  useEffect(()=>{
    fetch('/api/block/234234')
        .then(res => res.json())
        .then(res => {
          console.log('response', res.data )});
  },[]);

  return (
      <Router>
          <Switch>
              <Container fluid>
                  <Route path='/' >
                      <Main/>
                  </Route>
                  <Route path='/:id' render={({ match}) =>
                      <Block />}
                  />
              </Container>
          </Switch>
      </Router>

  );
}

export default App;
