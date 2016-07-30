import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';
import SCBLineChart from './SCBLineChart';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    let regionIndexes = [177, 18, 127];
    return (
      <div>
        <header>
          <h1><Link to="/">Statistics</Link></h1>
          <Link to="/population">Population</Link>
          <Link to="/workforce">Workforce</Link>
          <Link to="/economy">Economy</Link>
          {/*<Link to="/poweredby">Powered by</Link>*/}
        </header>
        <section>
          {this.props.children || 'Go to sub directories for data'}
        </section>
      </div>
    )
  }
}
