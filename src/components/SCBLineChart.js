import React, {PropTypes} from 'react';
import {Line} from "react-chartjs";
import RandomColor from "randomcolor";

class SCBLineChart extends React.Component {
  static baseUrl = "https://api.scb.se/OV0104/v1/doris/sv/ssd";
  static propTypes = {
    url: PropTypes.string.isRequired,
    codes: PropTypes.array.isRequired,
    debug: PropTypes.bool,
  };

  //title
  title = "";
  codeToValueTextDict = {}; //save names

  avg(arr = []) {
    return arr.reduce((a, b) => {return a + b}) / arr.length
  };

  makeChartData(values = {'code':[]}) {
    let orderedkeys = Object.keys(values).sort((x,y)=>{return this.avg(values[y])-this.avg(values[x])});
    return orderedkeys.map((val, index)=>{
      let color = RandomColor.randomColor({
        luminosity: 'light',
        seed: this.codeToValueTextDict.Region[val]
      });
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
        console.log("scb response ", res, res.title);
        this.title = res.title;
        this.querySCB(this.props.url, this.props.codes, res.variables).then(res => {
          console.log('Restructured query answer ', res, this.codeToValueTextDict);
          let chartData = {
            type: 'line',
            fill: false,
            labels: res.Tid.keys.splice(0,res.Tid.keys.length/ Object.keys(res.Region.values).length),
            datasets: this.makeChartData(res.Region.values)
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
      console.log('\n==================== query done! ====================\n');
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

  getSeries(code, variables = [], index) {
    if (!variables.length) {
      return []
    }

    let codeValues = variables.filter((val) => {
      return val.code == code
    });

    //debug
    if(this.props.debug) {
      for(var i =0; i<codeValues[0].valueTexts.length; i++){
        console.log(code, codeValues[0].valueTexts[i], codeValues[0].values[i], 'HAS INDEX ' + i)
      }
    }

    if (index.length) {
      return index.map(val => {
        let valueCode = codeValues[0].values[val];
        if(!this.codeToValueTextDict[code]) this.codeToValueTextDict[code] = {};
        this.codeToValueTextDict[code][valueCode] = codeValues[0].valueTexts[val];
        return valueCode
      })
    }

    return codeValues[0].values.map((val, index)=> {
      if(!this.codeToValueTextDict[code]) this.codeToValueTextDict[code] = {};
      this.codeToValueTextDict[code][val] = codeValues[0].valueTexts[index];
      return val
    });
  }

  render() {
    if (this.state) {
      let ContentCategoryName = Object.keys(this.codeToValueTextDict.ContentsCode).map(val=>{return this.codeToValueTextDict.ContentsCode[val] + ' - '});
      let n = Object.keys(this.codeToValueTextDict).map(code => {
        let nn = Object.keys(this.codeToValueTextDict[code]).map((val, index)=>{return (index ? ', ' :'') + this.codeToValueTextDict[code][val]});
        let style = {'display':'inline-block', 'margin': '0em 1em 0em 1em'};
        return <li key={code} style={style}>
                <h5>{code}: </h5>
                <h6>{nn}</h6>
              </li>
      });
      return (<div>
        <h4>{ContentCategoryName + this.title}</h4>
        <ul>{n}</ul>
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
