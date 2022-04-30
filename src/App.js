import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Shopcart from './pages/Shopcart';
import CardEspecifics from './pages/CardEspecifics';
import Checkout from './pages/Checkout';
import './App.css';

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
            <Route exact path="/shopcart" component={ Shopcart } />
            <Route
              exact
              path="/cardespecics/:query/:id"
              render={ (props) => (
                <CardEspecifics
                  superProps={ props }
                />
              ) }
            />
            <Route exact path="/checkout" component={ Checkout } />
          </Switch>
        </Router>
      </div>
    );
  }
} export default App;
