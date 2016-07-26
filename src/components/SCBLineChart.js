import React, {PropTypes} from 'react';
import {Line} from "react-chartjs";

class SCBLineChart extends React.Component {
  static baseUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd";
  static propTypes = {
    url: PropTypes.string.isRequired,
    codes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired
  };

  rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
    }
    // var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    var d = "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + ",0.2)";
    return (d);
  }

  avg(arr = []) {return arr.reduce((a, b) => {return a + b}) / arr.length};
  makeDataSets(values = {'code':[]}) {
    let orderedkeys = Object.keys(values).sort((x,y)=>{return this.avg(values[y])-this.avg(values[x])});
    return orderedkeys.map((val, index)=>{
      let color = this.rainbow(orderedkeys.length, index);
      return {
        label: this.codeToValueTextDict.Region[val],
        title: 'bajs2',
        tooltipTemplate: "bajs",
        fillColor: color,
        strokeColor: color,
        pointColor: color,
        pointStrokeColor: color,
        pointHighlightFill: color,
        pointHighlightStroke: color,
        data: values[val],
        borderWidth: 3
      }
    });
  };

  componentDidMount() {
    return this.get('get', this.props.url).then(
      res => {
        console.log("variable ", res);
        this.querySCB(this.props.url, this.props.codes, res.variables).then(res => {
          console.log('fun ', res);
          let chartData = {
            type: 'line',
            fill: false,
            labels: res.Tid.keys.splice(0,res.Tid.keys.length/ Object.keys(res.Region.values).length),
            datasets: this.makeDataSets(res.Region.values)
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
        let allValues = {};
        resp.data.map(val => {
          if(!allValues[val.key[i]]) {allValues[val.key[i]] = []}
          allValues[val.key[i]].push(parseInt(val.values[i]) || 0)
        });
        res[resp.columns[i].code] = {};
        res[resp.columns[i].code].keys = allKeys;
        res[resp.columns[i].code].values = allValues;
      }
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

  codeToValueTextDict = {};
  getSeries(code, variables = [], index) {
    if (!variables.length) {
      return []
    }

    let codeValues = variables.filter((val, index) => {
      return val.code == code
    });

    //debug
    // for(var i =0; i<codeValues[0].valueTexts.length; i++){
    //   console.log(code, codeValues[0].valueTexts[i], codeValues[0].values[i], 'HAS INDEX ' + i)
    // }

    if (index.length) {
      return index.map(val => {
        if(!this.codeToValueTextDict[code]) this.codeToValueTextDict[code] = {};
        let valueCode = codeValues[0].values[val];
        this.codeToValueTextDict[code][valueCode] = codeValues[0].valueTexts[val];
        return valueCode
      })
    }

    return codeValues[0].values
  }

  render() {
    if (this.state) {
      return (<div>
        <h4>{this.props.title}</h4>
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
