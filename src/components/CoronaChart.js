import React from 'react';
import {Line} from 'react-chartjs-2';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import update from 'immutability-helper';

class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChartData: this.props.allChartData
    };
    this.isDayZero = false;
    this.chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
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

  updateData(result) {
    this.setState({
      allChartData: result
    });
  }

  toggleDayZeroView(chartType, numDays) {
    if (this.allChartDataOriginal === undefined) {
      this.allChartDataOriginal = this.state.allChartData;
    }
    if (this.allChartDataDayZero === undefined) {
      this.allChartDataDayZero = this.dayZeroView(this.allChartDataOriginal, chartType, numDays);
    }

    if (!this.isDayZero) {
      this.setState({ allChartData: this.allChartDataDayZero });
      this.allChartDataPrevious = this.state.allChartData;
      this.isDayZero = true;
    } else {
      this.setState({ allChartData: this.allChartDataOriginal });
      this.allChartDataPrevious = this.state.allChartData;
      this.isDayZero = !this.isDayZero;
    }
  }

  updateDayZeroView(chartType, numDays) {
    if (this.isDayZero) {
      this.allChartDataDayZero = undefined;
      console.log("updateDayZeroView" + numDays);
      this.toggleDayZeroView(chartType, numDays);
      this.toggleDayZeroView(chartType, numDays);
    }
  }

  dayZeroView(allChartData0, chartType, numDays) {
    console.log("dayZeroView"+ numDays);

    return update(allChartData0, {
      numbers: {
        $set: allChartData0.numbers.map((obj) => {
          var x = obj[chartType].findIndex((e) => e > numDays);
          var sliced = obj[chartType].slice(x, obj[chartType].length);
          // obj[chartType] = sliced;
          // return obj;
          return update(obj, {[chartType]: {$set: sliced}})
        })
      },
      months: {
        $set: Array(allChartData0.months.length).fill().map((x,i)=> {
            return "Day "+i;
        })
      }
    });
  }

  render() {
    var title = makeTitle(this.props.chartType);
    var chart = makeChart(this.state.allChartData,
                          this.props.chartType,
                          this.chartOptions,
                          this.chartColors);
    return (
      <div className="chart-section">
        <h2 style={{display: 'flex', justifyContent: 'center'}}>{title}</h2>
        <div className="chart-buttons">
          <FormControlLabel
            control={<Switch size="small" onChange={() => this.toggleDayZeroView(this.props.chartType, 100)} />}
            label="Day 0"
          /> since
          <TextField
            id="standard-number"
            size="small"
            // variant="outlined"
            defaultValue="100"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => this.updateDayZeroView(this.props.chartType, e.target.value)}
            style={{width: '35px', marginLeft: '5px'}}
          /> cases
        </div>
        <div className="chart-container">{chart}</div>
      </div>
    )
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
    default:
      title = "COVID-19 data";
      break;
  }
  return title;
}

function makeChart(allChartData, chartType, chartOptions, chartColors) {
  let chart;
  var singleChartData = chartData(allChartData, chartType, chartColors);
  if (chartType === "confirmed_daily") {
    chart = <Line data={singleChartData} options={chartOptions} redraw/>
  } else {
    chart = <Line data={singleChartData} options={chartOptions} redraw/>
  }
  return chart;
}

function chartData(allChartData, type, chartColors) {
  return {
    labels: allChartData.months,
    datasets: allChartData.numbers.map((x, index) => {
      var colorNames = Object.keys(chartColors);
      var colorName = colorNames[index % colorNames.length];
      var newColor = chartColors[colorName];
      switch (type) {
        case "confirmed":
          return chartDataSet(x.country, x.confirmed, newColor);
        case "death":
          return chartDataSet(x.country, x.death, newColor);
        case "recovered":
          return chartDataSet(x.country, x.recovered, newColor);
        case "active":
          return chartDataSet(x.country, x.active, newColor);
        case "confirmed_daily":
          return chartDataSet(x.country, x.confirmed_daily, newColor);
        case "death_daily":
          return chartDataSet(x.country, x.death_daily, newColor);
        default:
          return chartDataSet(x.country, x.confirmed, newColor)
      }

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
    pointBorderColor: 'rgba(75,192,192,1)',
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
