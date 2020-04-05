import React from 'react';
import {Line} from 'react-chartjs-2';
import update from 'immutability-helper';
import CoronaChartControlBar from '../components/CoronaChartControlBar'

class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChartData: this.props.allChartData
    };
    this.chartReference = React.createRef();
    this.isDayZeroView = false;
    this.isPerCapitaView = false;
    this.isLogScaleView = false;
    this.isWeekView = false;
    this.dayZaroNum = 1;

    this.toggleDayZeroView = this.toggleDayZeroView.bind(this);
    this.togglePerCapitaView = this.togglePerCapitaView.bind(this);
    this.toggleLogScaleView = this.toggleLogScaleView.bind(this);
    this.toggleWeekView = this.toggleWeekView.bind(this);
    this.updateDayZeroView = this.updateDayZeroView.bind(this);
    this.showOrHide = this.showOrHide.bind(this);
    this.sinceWord = this.sinceWord.bind(this);

    this.chartColors =
      { red: 'rgb(255, 99, 132)'
      , yellow: 'rgb(255, 205, 86)'
      , blue: 'rgb(54, 162, 235)'
      , salmon: 'rgb(250,128,114)'
      , pale_golden_rod: 'rgb(238, 232, 170)'
      , gold: 'rgb(255, 215, 0)'
      , light_sky_blue: 'rgb(135, 206, 250)'
      , pink: 'rgb(255, 192, 203)'
      , light_salmon: 'rgb(255, 160, 122)'
      , green: 'rgb(75, 192, 192)'
      , purple: 'rgb(153, 102, 255)'
      // , grey: 'rgb(201, 203, 207)'
      , deep_sky_blue: 'rgb(0, 191, 255)'
      , yellow_green: 'rgb(154, 205, 50)'
      , orange: 'rgb(255, 159, 64)'
      , plum: 'rgb(211, 160, 221)'
      , green_yellow: 'rgb(173, 255, 47)'
      , dark_orange: 'rgb(255, 140, 0)'
      , medium_slate_blue	: 'rgb(123, 104, 238)'
      , light_green: 'rgb(144, 238, 144)'
      , royal_blue: 'rgb(65, 105, 225)'
      , dark_turquoise: 'rgb(0, 206, 209)'
      , orchid: 'rgb(218, 112, 214)'
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
    if (this.hiddenLabels !== undefined) {
      this.hiddenLabels.forEach((label) => {
        this.hideDataset(label);
      });
    }
    if (this.allChartDataOriginal === undefined) {
      this.allChartDataOriginal = this.state.allChartData;
    }
    this.logScaleView();
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
          <CoronaChartControlBar
            chartType={this.props.chartType}
            isWeekView={this.isWeekView}
            dayZaroNum={this.dayZaroNum}
            sinceWord={this.sinceWord}
            toggleDayZeroView={this.toggleDayZeroView}
            togglePerCapitaView={this.togglePerCapitaView}
            toggleLogScaleView={this.toggleLogScaleView}
            toggleWeekView={this.toggleWeekView}
            updateDayZeroView={this.updateDayZeroView}
            showOrHide={this.showOrHide}
          />
        </div>
        <div className="chart-container">{chart}</div>
      </div>
    )
  }

  sinceWord(chartType) {
    switch (chartType) {
      case "death":           return "deaths";
      case "death_daily":     return "deaths a day";
      case "recovered":       return "recovered";
      case "recovered_daily": return "recovered a day";
      case "confirmed":       return "cases";
      case "confirmed_daily": return "cases a day";
      case "active":          return "cases";
      case "net_daily":       return "cases a day";
      default:                return "cases";
    }
  }

  updateData(result) {
    this.allChartDataOriginal = result;

    this.setState({
      allChartData: result
    });
  }

  toggleDayZeroView(chartType) {
    this.isDayZeroView = !this.isDayZeroView;
    this.hiddenLabels = this.getCurrentHiddenLabels();
    var newData = this.yieldChartData(chartType);
    this.setState({ allChartData: newData });
  }

  toggleWeekView(chartType) {
    this.isWeekView = !this.isWeekView;
    this.hiddenLabels = this.getCurrentHiddenLabels();
    var newData = this.yieldChartData(chartType);
    this.setState({ allChartData: newData });
  }

  togglePerCapitaView(chartType) {
    this.isPerCapitaView = !this.isPerCapitaView;
    this.hiddenLabels = this.getCurrentHiddenLabels();
    var newData = this.yieldChartData(chartType);
    this.setState({ allChartData: newData });
  }

  toggleLogScaleView(chartType) {
    this.isLogScaleView = !this.isLogScaleView;
    this.logScaleView();
  }

  updateDayZeroView(chartType, integer) {
    this.dayZaroNum = integer;
    this.hiddenLabels = this.getCurrentHiddenLabels();
    if (this.isDayZeroView) {
      var newData = this.yieldChartData(chartType);
      this.setState({ allChartData: newData });
    }
  }

  yieldChartData(chartType) {
    var newData;
    newData = this.dayZeroView(this.allChartDataOriginal, chartType);
    newData = this.perCapitaView(newData, chartType);
    newData = this.weekView(newData, chartType);
    return newData;
  }

  dayZeroView(allChartData0, chartType) {
    if (this.isDayZeroView) {
      return update(allChartData0, {
        numbers: {
          $set: allChartData0.numbers
            .filter(x => x[chartType] !== undefined)
            .map((obj) => {
              var x = obj[chartType].findIndex((e) => e >= this.dayZaroNum);
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
    } else {
      return allChartData0;
    }
  }

  weekView(allChartData0, chartType) {
    if (this.isWeekView) {
      return update(allChartData0, {
        numbers: {
          $set: allChartData0.numbers
            .filter(x => x[chartType] !== undefined)
            .map((obj) => {
              var old = obj[chartType];
              var newList = []; var x = 0;
              for (var i =0; i < old.length; i++) {
                if ((i+1) % 7 === 0) {
                  newList.push(old[i]+x); x=0;
                } else if ( i+1 === old.length ) {
                  // newList.push(old[i]+x); // append incomplete days as last week
                  // ignore rest
                } else {
                  x = x+old[i]
                }
              }
              return update(obj, {[chartType]: {$set: newList}})
            })
        },
        days: {
          $set: Array(Math.round(allChartData0.days.length/7)).fill().map((x,i)=> {
              return "Week "+(i+1);
          })
        }
      });
    } else {
      return allChartData0;
    }
  }

  perCapitaView(allChartData0, chartType) {
    if (this.isPerCapitaView) {
      return update(allChartData0, {
        numbers: {
          $set: allChartData0.numbers
            .filter(x => x[chartType] !== undefined)
            .map((obj) => {
              var perCapitaList = obj[chartType].map((x) => {
                return x / obj.population * 1000000;
              });
              return update(obj, {[chartType]: {$set: perCapitaList}})
            })
        }
      });
    } else {
      return allChartData0;
    }
  }

  logScaleView() {
    var chart = this.chartReference.current.chartInstance;
    if (this.isLogScaleView) {
      chart.options.scales.yAxes[0].type = "logarithmic";
    } else {
      chart.options.scales.yAxes[0].type = "linear";
    }
    chart.update();
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

  getCurrentHiddenLabels() {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;

    var labelList = [];
    for (var i=0; i<datasets.length; i++) {
      var meta = chart.getDatasetMeta(i);
      if (meta.hidden === true) {
        labelList.push(datasets[i].label)
      }
    }
    return labelList;
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
    case "death_vs_icu":
      title = "COVID-19 reported vs deaths vs in ICU";
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
    datasets: allChartData.numbers
      .filter(x => x[chartType] !== undefined)
      .map((x, index) => {
        var colorNames = Object.keys(chartColors);
        var colorName = colorNames[index % colorNames.length];
        var newColor = chartColors[colorName];
        // return chartDataSet(x.name, x[chartType], newColor);
        switch (x.name) {
         case "China":
          return chartDataSet(x.name, x[chartType], 'rgb(211,211,211)');
         default:
          return chartDataSet(x.name, x[chartType], newColor);
       }
        // switch (chartType) {
        //   case "confirmed":
        //     return chartDataSet(x.name, x.confirmed, newColor);
        //   case "death":
        //     return chartDataSet(x.name, x.death, newColor);
        //   case "recovered":
        //     return chartDataSet(x.name, x.recovered, newColor);
        //   case "active":
        //     return chartDataSet(x.name, x.active, newColor);
        //   case "confirmed_daily":
        //     return chartDataSet(x.name, x.confirmed_daily, newColor);
        //   case "death_daily":
        //     return chartDataSet(x.name, x.death_daily, newColor);
        //   case "recovered_daily":
        //     return chartDataSet(x.name, x.recovered_daily, newColor);
        //   case "net_daily":
        //     return chartDataSet(x.name, x[chartType], newColor);
        //   default:
        //     return chartDataSet(x.name, x.confirmed, newColor)
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
