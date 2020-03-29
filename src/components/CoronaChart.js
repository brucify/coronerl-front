import React from 'react';
import {Line} from 'react-chartjs-2';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import update from 'immutability-helper';

class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChartData: this.props.allChartData
    };
    this.chartReference = React.createRef();
    this.isDayZeroView = false;
    this.isPerCapitaView = false;
    this.dayZaroNum = 1;
    this.chartColors =
      { red: 'rgb(255, 99, 132)'
      , yellow: 'rgb(255, 205, 86)'
      , blue: 'rgb(54, 162, 235)'
      , orange: 'rgb(255, 159, 64)'
      , green: 'rgb(75, 192, 192)'
      , purple: 'rgb(153, 102, 255)'
      // , grey: 'rgb(201, 203, 207)'
      , pink: 'rgb(255, 192, 203)'
      , light_sky_blue: 'rgb(135, 206, 250)'
      , light_green: 'rgb(144, 238, 144)'
      , light_coral: 'rgb(240, 128, 128)'
      };
    this.chartOptions = {
      maintainAspectRatio: false,
      legend: {
         display: true,
         align: "start",
         position: "bottom"
       }
    };
  }

  componentDidUpdate() {
    this.hideDataset("China");
    if (this.allChartDataOriginal === undefined) {
      this.allChartDataOriginal = this.state.allChartData;
    }
  }

  render() {
    var title = makeTitle(this.props.chartType);
    var chart = makeChart(this.chartReference,
                          this.state.allChartData,
                          this.props.chartType,
                          this.chartOptions,
                          this.chartColors);
    return (
      <div className="chart-section">
        <h2 style={{display: 'flex', justifyContent: 'center'}}>{title}</h2>
        <div className="chart-buttons-section">
          <div className="chart-buttons">
            <div className="chart-buttons-left">
              <Button color="secondary" onClick={() => this.showOrHide()} >Show / Hide All</Button>
            </div>
            <div className="chart-buttons-right">
              <FormControlLabel
                control={<Switch size="small" onChange={() => this.togglePerCapitaView(this.props.chartType)} />}
                label="Per 1M Capita"
              />
              <FormControlLabel
                control={<Switch size="small" onChange={() => this.toggleDayZeroView(this.props.chartType, this.dayZaroNum)} />}
                label="Day 0"
              /> since
              <TextField
                id="standard-number"
                size="small"
                // variant="outlined"
                defaultValue={this.dayZaroNum}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => this.updateDayZeroView(this.props.chartType, e.target.value)}
                // style={{width: '30px', marginLeft: '5px'}}
              /> cases
            </div>
          </div>
        </div>
        <div className="chart-container">{chart}</div>
      </div>
    )
  }

  updateData(result) {
    this.setState({
      allChartData: result
    });
  }

  toggleDayZeroView(chartType, numDays) {
    this.dayZaroNum = numDays;
    if (this.allChartDataDayZero === undefined) {
      this.allChartDataDayZero = this.dayZeroView(this.allChartDataOriginal, chartType, this.dayZaroNum);
    }

    var newData;
    if (!this.isDayZeroView) {
      newData = this.allChartDataDayZero;
      if (this.isPerCapitaView) {
        newData = this.perCapitaView(this.allChartDataDayZero, chartType);
      }
      this.setState({ allChartData: newData });
      this.isDayZeroView = true;
    } else {
      newData = this.allChartDataOriginal;
      if (this.isPerCapitaView) {
        newData = this.perCapitaView(this.allChartDataOriginal, chartType);
      }
      this.setState({ allChartData: newData });
      this.isDayZeroView = false;
    }
  }

  togglePerCapitaView(chartType) {
    if (this.allChartDataPerCapita === undefined) {
      this.allChartDataPerCapita = this.perCapitaView(this.allChartDataOriginal, chartType);
    }

    var newData;
    if (!this.isPerCapitaView) {
      newData = this.allChartDataPerCapita;
      if (this.isDayZeroView) {
        newData = this.dayZeroView(this.allChartDataPerCapita, chartType, this.dayZaroNum);
      }
      this.setState({ allChartData: newData });
      this.isPerCapitaView = true;
    } else {
      newData = this.allChartDataOriginal;
      if (this.isDayZeroView) {
        newData = this.dayZeroView(this.allChartDataOriginal, chartType, this.dayZaroNum);
      }
      this.setState({ allChartData: newData });
      this.isPerCapitaView = false;
    }
  }

  updateDayZeroView(chartType, numDays) {
    if (this.isDayZeroView) {
      this.allChartDataDayZero = undefined;
      this.toggleDayZeroView(chartType, numDays);
      this.toggleDayZeroView(chartType, numDays);
    }
  }

  dayZeroView(allChartData0, chartType, numDays) {
    return update(allChartData0, {
      numbers: {
        $set: allChartData0.numbers.map((obj) => {
          var x = obj[chartType].findIndex((e) => e >= numDays);
          var sliced = obj[chartType].slice(x, obj[chartType].length);
          // obj[chartType] = sliced;
          // return obj;
          return update(obj, {[chartType]: {$set: sliced}})
        })
      },
      days: {
        $set: Array(allChartData0.days.length).fill().map((x,i)=> {
            return "Day "+i;
        })
      }
    });
  }

  perCapitaView(allChartData0, chartType) {
    return update(allChartData0, {
      numbers: {
        $set: allChartData0.numbers.map((obj) => {
          var perCapitaList = obj[chartType].map((x) => {
            return x / obj.population * 1000000;
          });
          return update(obj, {[chartType]: {$set: perCapitaList}})
        })
      }
    });
  }

  showOrHide() {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;

    var allHidden = true;
    for (var i=0; i<datasets.length; i++) {
      var meta = chart.getDatasetMeta(i);
      if (meta.hidden !== true) {
        meta.hidden = true;
        allHidden = false;
      }
    }
    if (allHidden) {
      for (var j=0; j<datasets.length; j++) {
        meta = chart.getDatasetMeta(j);
        meta.hidden = null;
      }
    }
    chart.update();
  }

  hideDataset(countryName) {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;
    for (var i=0; i<datasets.length; i++) {
      if(datasets[i].label === countryName) {
        chart.getDatasetMeta(i).hidden = true;
      }
    }
    chart.update();
  }
}

export default CoronaChart;

function makeTitle(chartType) {
  let title;
  switch (chartType) {
    case "confirmed":
      title = "COVID-19 cumulative reported cases";
      break;
    case "death":
      title = "COVID-19 cumulative deaths";
      break;
    case "recovered":
      title = "COVID-19 cumulative recovered cases";
      break;
    case "active":
      title = "COVID-19 remaining cases";
      break;
    case "confirmed_daily":
      title = "COVID-19 new cases per day";
      break;
    case "death_daily":
      title = "COVID-19 new deaths per day";
      break;
    case "recovered_daily":
      title = "COVID-19 new recovered per day";
      break;
    case "net_daily":
      title = "COVID-19 net increase per day";
      break;
    default:
      title = "COVID-19 data";
      break;
  }
  return title;
}

function makeChart(chartReference, allChartData, chartType, chartOptions, chartColors) {
  let chart;
  var chartDataForType = chartData(allChartData, chartType, chartColors);
  if (chartType === "confirmed_daily") {
    chart = <Line
              ref={chartReference}
              data={chartDataForType} options={chartOptions} redraw
              // getDatasetAtEvent={(dataset) => {datasets.for}}
            />
  } else {
    chart = <Line
              ref={chartReference}
              data={chartDataForType} options={chartOptions} redraw
              // getDatasetAtEvent={(dataset) => {}}
            />
  }
  return chart;
}

function chartData(allChartData, chartType, chartColors) {
  return {
    labels: allChartData.days,
    datasets: allChartData.numbers.map((x, index) => {
      var colorNames = Object.keys(chartColors);
      var colorName = colorNames[index % colorNames.length];
      var newColor = chartColors[colorName];
      // return chartDataSet(x.country, x[chartType], newColor);
      switch (x.country) {
       case "China":
        return chartDataSet(x.country, x[chartType], 'rgb(211,211,211)');
       default:
        return chartDataSet(x.country, x[chartType], newColor);
     }
      // switch (chartType) {
      //   case "confirmed":
      //     return chartDataSet(x.country, x.confirmed, newColor);
      //   case "death":
      //     return chartDataSet(x.country, x.death, newColor);
      //   case "recovered":
      //     return chartDataSet(x.country, x.recovered, newColor);
      //   case "active":
      //     return chartDataSet(x.country, x.active, newColor);
      //   case "confirmed_daily":
      //     return chartDataSet(x.country, x.confirmed_daily, newColor);
      //   case "death_daily":
      //     return chartDataSet(x.country, x.death_daily, newColor);
      //   case "recovered_daily":
      //     return chartDataSet(x.country, x.recovered_daily, newColor);
      //   case "net_daily":
      //     return chartDataSet(x.country, x[chartType], newColor);
      //   default:
      //     return chartDataSet(x.country, x.confirmed, newColor)
      // }

    })
  }
}

function chartDataSet(country, data, newColor) {
  return {
    label: country,
    data: data, //[65 , 59, 80, 81, 56, 55, 40]
    fill: false,
    lineTension: 0.1,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: newColor,
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    // pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: newColor,
    pointHoverBorderColor: newColor,
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10
  }
}
