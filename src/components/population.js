import React from 'react';
import SCBLineChart from './SCBLineChart';
import Code from "../types/code";

export default class Population extends React.Component {
  render() {
    let regionIndexes = [177, 18, 127];
    let population = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationIncrease = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [1]}, {code: 'Tid', index: []}];
    let populationDenseness = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [0]}, {code: 'Tid', index: []}];
    let populationLandArea = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [2]}, {code: 'Tid', index: []}];

    let time = [10,11,12,13,14,15,16,17,18];
    return (<div>
      <h2>Population</h2>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={population}/>
      <SCBLineChart url="/BE/BE0101/BE0101A/BefolkningNy" codes={populationIncrease}/>
      <SCBLineChart url="/BE/BE0101/BE0101C/BefArealTathetKon" codes={populationDenseness}/>
      <SCBLineChart url="/BE/BE0101/BE0101C/BefArealTathetKon" codes={populationLandArea}/>
      <SCBLineChart url="/BE/BE0101/BE0101J/Flyttningar97" codes={[
        new Code('Region', [1,2,3]),
        new Code('ContentsCode', [8]),
        new Code('Tid',time),
      ]}/>
      <SCBLineChart url="/BE/BE0101/BE0101J/Flyttningar97" codes={[
        new Code('Region', [1,2,3]),
        new Code('ContentsCode', [4]),
        new Code('Tid',time),
      ]}/>
      <SCBLineChart url="/BE/BE0101/BE0101J/Flyttningar97" codes={[
        new Code('Region', [1,2,3]),
        new Code('ContentsCode', [5]),
        new Code('Tid',time),
      ]}/>
    </div>)
  }
}
