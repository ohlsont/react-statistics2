import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';
import SCBLineChart from './SCBLineChart';

const App = ({children}) => {
  return (
    <div>
      <header>
        <h1>Statistics</h1>
        <Link to="/about">About</Link>
        <Link to="/poweredby">Powered by</Link>
      </header>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy"/>
      <section>
        {children || 'Welcome to React Starterify'}
      </section>
    </div>
  )
};

App.propTypes = {children: React.PropTypes.object};

export default App;
