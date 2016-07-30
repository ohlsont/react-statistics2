import React from 'react';
import SCBLineChart from '../components/SCBLineChart';
import Code from "../types/code";

export default class Taxes extends React.Component {

  render() {
    return (<div>
      <h2>{this.constructor.name}</h2>
      <SCBLineChart url="/OE/OE0701/ForvInkomsterA" codes={[
        new Code('Region', [177, 18, 127]),
        new Code('ContentsCode', [2]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/OE/OE0701/KapInkomsterA" codes={[
        new Code('Region', [177, 18, 127]),
        new Code('ContentsCode', [1]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/OE/OE0701/DebSkatterA" codes={[
        new Code('Region', [177, 18, 127]),
        new Code('ContentsCode', [0]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/OE/OE0101/Kommunalskatter2000" codes={[
        new Code('Region', [177, 18, 127]),
        new Code('ContentsCode', [0]),
        new Code('Tid')
      ]}/>
    </div>)
  }
}
