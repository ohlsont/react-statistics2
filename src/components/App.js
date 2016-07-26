import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';
import SCBLineChart from './SCBLineChart';
import Dropdown from 'react-dropdown'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    let codes = [{code: 'Region', index: [177, 1, 0]}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    return (
      <div>
        <header>
          <h1>Statistics</h1>
          <Link to="/about">About</Link>
          <Link to="/poweredby">Powered by</Link>
        </header>
        <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={codes}/>
        {/*<Dropdown options={this.options} placeholder="Select an option" />*/}
        <section>
          {this.props.children || 'Welcome to React Starterify'}
        </section>
      </div>
    )
  }
}

export default App;
