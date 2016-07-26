import React from 'react';
import {Link} from 'react-router';
import {version} from '../../package.json';
import SCBLineChart from './SCBLineChart';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: React.PropTypes.object
  };

  render() {
    let regionIndexes = [177, 18, 127];
    let notInWorkforce = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    return (
      <div>
        <header>
          <h1><Link to="/">Statistics</Link></h1>
          <Link to="/population">Population</Link>
          <Link to="/workforce">Workforce</Link>
          {/*<Link to="/poweredby">Powered by</Link>*/}
        </header>
        <section>
          {this.props.children}
          <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={notInWorkforce}/>
        </section>
      </div>
    )
  }
}

export default App;
