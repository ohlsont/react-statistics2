import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    let regionIndexes = [177, 1, 0, 127];
    let population = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationIncrease = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [1]}, {code: 'Tid', index: []}];
    return (
      <div>
        <header>
          <h1><Link to="/">Statistics</Link></h1>
          <Link to="/population">Population</Link>
          <Link to="/poweredby">Powered by</Link>
        </header>
        <section>
          {this.props.children || 'Welcome to React Starterify'}
        </section>
      </div>
    )
  }
}

export default App;
