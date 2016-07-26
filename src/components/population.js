import React from 'react';
import SCBLineChart from './SCBLineChart';

class Population extends React.Component {
  render() {
    let regionIndexes = [177, 1, 0, 127];
    let population = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationIncrease = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [1]}, {code: 'Tid', index: []}];
    return (<div>
      <h2>Population</h2>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={population} title={'Befolkning Göteborg, Stockholm, Riket'}/>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={populationIncrease} title={'Befolkningsökning Göteborg, Stockholm, Riket'}/>
    </div>)
  }
}
export default Population;
