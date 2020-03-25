import React from 'react';
import {Line} from 'react-chartjs-2';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return oneChart(this.props.allChartData,
                    this.props.chartType,
                    this.chartOptions,
                    this.chartColors)
  }
}

export default CoronaChart;

function oneChart(allChartData, chartType, chartOptions, chartColors) {
  let title;
  switch (chartType) {
    case "confirmed":
      title = "COVID-19 total reported cases";
      break;
    case "death":
      title = "COVID-19 reported deaths";
      break;
    case "recovered":
      title = "COVID-19 total recovered cases";
      break;
    case "active":
      title = "COVID-19 remaining cases";
      break;
    case "confirmed_daily":
      title = "COVID-19 new reported cases per day";
      break;
    case "death_daily":
      title = "COVID-19 new deaths per day";
      break;
    default:
      title = "COVID-19 data";
      break;
  }
  let chart;
  var singleChartData = chartData(allChartData, chartType, chartColors);
  if (chartType === "confirmed_daily") {
    chart = <Line data={singleChartData} options={chartOptions}/>
  } else {
    chart = <Line data={singleChartData} options={chartOptions}/>
  }

  return (
    <div className="chart-section">
      <h2 style={{display: 'flex', justifyContent: 'center'}}>{title}</h2>
      <div className="chart-buttons">
        <FormControlLabel
          control={<Switch size="small" onChange={() => console.log("onChange")} />}
          label="Day 0"
        />
      </div>
      <div className="chart-container">{chart}</div>

    </div>
  )
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
