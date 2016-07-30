import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './pages/App';
import Workforce from './pages/workforce';
import Population from './pages/population';
import Economy from "./pages/economy";
import Taxes from "./pages/taxes";

window.React = React;

render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/population" component={Population} />
      <Route path="/workforce" component={Workforce} />
      <Route path="/economy" component={Economy} />
      <Route path="/taxes" component={Taxes} />
    </Route>
  </Router>), document.getElementById('content')
);
