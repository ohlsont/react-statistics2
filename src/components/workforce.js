import React from 'react';
import SCBLineChart from './SCBLineChart';

export default class Workforce extends React.Component {
  render() {
    let regionIndexes = [1,12];
    let notInWorkforce = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [1]}, {code: 'Tid', index: []}];
    let totalPeople = [{code: 'Region', index: regionIndexes}, {code: 'ContentsCode', index: [2]}, {code: 'Tid', index: []}];
    return (<div>
      <h2>Work force</h2>
      <SCBLineChart url="/AM/AM9906/AM9906B/RegionIndU1b" codes={notInWorkforce}/>
      <SCBLineChart url="/AM/AM9906/AM9906B/RegionIndU1b" codes={totalPeople} debug={true}/>
    </div>)
  }
}
