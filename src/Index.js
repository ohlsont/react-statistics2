import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/App';
import Workforce from './components/workforce';
import Population from './components/population';
import Economy from "./components/economy";

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/population" component={Population} />
      <Route path="/workforce" component={Workforce} />
      <Route path="/economy" component={Economy} />
    </Route>
  </Router>), document.getElementById('content')
);
