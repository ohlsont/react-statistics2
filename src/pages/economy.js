import React from 'react';
import SCBLineChart from '../components/SCBLineChart';
import Code from "../types/code";

export default class Economy extends React.Component {

  render() {
    var regionIndexes = [177, 18, 127];
    return (<div>
      <h2>Economy</h2>
      <SCBLineChart url="/HE/HE0110/HE0110A/SamForvInk2" codes={[
        new Code('Region', [0, 177, 18, 127]),
        new Code('ContentsCode', [0]),
        new Code('Alder', [3]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0110/HE0110A/SamForvInk2" codes={[
        new Code('Region', [177, 18, 127]),
        new Code('ContentsCode', [2]),
        new Code('Alder', [3]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={[
        new Code('Region', regionIndexes),
        new Code('ContentsCode', [0]),
        new Code('TillgangSkuld', [6]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={[
        new Code('Region', regionIndexes),
        new Code('ContentsCode', [0]),
        new Code('TillgangSkuld', [7]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={[
        new Code('Region', regionIndexes),
        new Code('ContentsCode', [0]),
        new Code('TillgangSkuld', [18]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={[
        new Code('Region', regionIndexes),
        new Code('ContentsCode', [3]),
        new Code('TillgangSkuld', [18]),
        new Code('Tid')
      ]}/>
      <SCBLineChart url="/HE/HE0104/TillgOversiktReg" codes={[
        new Code('Region', regionIndexes),
        new Code('ContentsCode', [3]),
        new Code('TillgangSkuld', [18]),
        new Code('Tid')
      ]}/>
    </div>)
  }
}
