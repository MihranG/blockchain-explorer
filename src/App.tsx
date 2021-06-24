import React , {useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';


function App() {
  useEffect(()=>{
    fetch('/api/block/234234')
        .then(res => res.json())
        .then(res => {
          console.log('response', res.data )});
  },[])
  return (
      <Router>
          <Switch>
              <Route path='/:id' render={({ location, match}) =>
                  <div>{match.params.id}</div>
              }>
              </Route>
              <Route path='/'>
                  <div className="App">
                      <header className="App-header">

                          <Button variant="outline-secondary" >
                              test
                          </Button>
                      </header>
                  </div>
              </Route>
          </Switch>

      </Router>

  );
}

export default App;
