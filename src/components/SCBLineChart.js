import React, {PropTypes} from 'react';
import {Line} from "react-chartjs";

class SCBLineChart extends React.Component {
  static baseUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd";
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  componentDidMount() {
    return this.get('get', this.props.url).then(
      res => {
        let codes = [{code: 'Region', index: 1}, {code: 'ContentsCode', index: 1}, {code: 'Tid', index: 0}];
        console.log("variable ", res);
        this.querySCB(this.props.url, codes, res.variables).then(res => {
          console.log('fun ', res);
          let chartData = {
            type: 'line',
            fill: false,
            labels: res.Tid.keys,
            datasets: [{
              label: 'Hejj',
              title: 'bajs2',
              tooltipTemplate: "bajs",
              fillColor: "rgba(220,0,0,0.2)",
              data: res.Region.values,
              borderWidth: 3
            }]
          };
          console.log("variable setting chartData", chartData);
          this.setState({chartData: chartData});
        });
      },
      err => {
        console.log("err ", err)
      }
    );
  }

  makeQuerySCB(codes, variables) {
    var codeMap = {};
    codes.map(val => {
      codeMap[val.code] = this.getSeries(val.code, variables, val.index);
    });
    let queries = Object.keys(codeMap).map(key => {
      return {
        "code": key,
        "selection": {
          "filter": "item",
          "values": codeMap[key]
        }
      }
    });
    console.log("queries ", queries, codeMap);
    return {
      "query": queries,
      "response": {
        "format": "json"
      }
    }
  }

  querySCB(url, codes, variables) {
    let data = this.makeQuerySCB(codes, variables);
    console.log("variable sending", data);
    return this.get('post', url, data).then(resp => {
      console.log("got query answer ", resp);
      var res = {};
      for (var i = 0; i < resp.columns.length; i++) {
        let allKeys = resp.data.map(val => {
          return val.key[i]
        });
        let allValues = resp.data.map(val => {
          return val.values[i]
        });
        res[resp.columns[i].code] = {};
        res[resp.columns[i].code].keys = allKeys;
        res[resp.columns[i].code].values = allValues;
      }
      console.log("final ", res);
      return res
    }, error => {
      console.log("err ", error)
    });
  }

  get(method, url, data) {
    var options = {
      method: method,
      headers: {
        'Content-Type': 'text/plain'
      }
    };
    if (data) {
      options.body = JSON.stringify(data)
    }
    let finalUrl = SCBLineChart.baseUrl + url;
    console.log('requesting', finalUrl);
    return fetch(finalUrl, options).then(resp=> {
      return resp.json()
    }, err => {
      console.log("variable error", err)
    })
  }

  getSeries(code, variables = [], index) {
    if (!variables.length) {
      return []
    }
    let codeValues = variables.filter(val => {
      return val.code == code
    });

    if (index) {
      return [codeValues[0].values[index - 1]]
    }
    return codeValues[0].values
  }

  render() {
    if (this.state) {
      return (<div>
        <h4>{this.state.title}</h4>
        <Line data={this.state.chartData} options={{responsive: true}}/>
      </div>)
    } else {
      console.log("variable no state");
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      )
    }
  }
}

export default SCBLineChart;
