import React from 'react';
import SCBLineChart from './SCBLineChart';

export default class Population extends React.Component {
  state = {
    regionIndexes: [177, 18, 127]
  };

  render() {
    let population = [{code: 'Region', index: this.state.regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationIncrease = [{code: 'Region', index: this.state.regionIndexes}, {code: 'ContentsCode', index: [1]}, {code: 'Tid', index: []}];
    let populationDenseness = [{code: 'Region', index: this.state.regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationLandArea = [{code: 'Region', index: this.state.regionIndexes}, {code: 'ContentsCode', index: [2]}, {code: 'Tid', index: []}];
    return (<div>
      <h2>Population</h2>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={population}/>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={populationIncrease}/>
      <SCBLineChart url="/BE/BE0101/BE0101C/BefArealTathetKon" codes={populationDenseness}/>
      <SCBLineChart url="/BE/BE0101/BE0101C/BefArealTathetKon" codes={populationLandArea}/>
    </div>)
  }
}
