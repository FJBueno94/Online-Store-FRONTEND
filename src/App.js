import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
// import * as api from './services/api';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
          </Switch>
        </Router>
      </div>
    );
  }
} export default App;
