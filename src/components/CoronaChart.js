import React from 'react';
import {Line} from 'react-chartjs-2';
import {Scatter} from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import update from 'immutability-helper';
import CoronaChartControlBar from '../components/CoronaChartControlBar'
import CoronaDialog from '../components/CoronaDialog'
import {sinceWord} from '../components/CoronaChartControlBar'

class CoronaChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChartData: this.props.allChartData,
      datasets: [],
      isDayZeroView:   false,
      isPerCapitaView: false,
      isWeekView:      false,
      dayZaroNum: 1
    };
    this.isLogScaleView = false;
    this.chartReference = React.createRef();
    this.toggleDayZeroView   = this.toggleDayZeroView.bind(this);
    this.togglePerCapitaView = this.togglePerCapitaView.bind(this);
    this.toggleLogScaleView  = this.toggleLogScaleView.bind(this);
    this.toggleWeekView      = this.toggleWeekView.bind(this);
    this.updateDayZeroView   = this.updateDayZeroView.bind(this);
    this.showOrHide          = this.showOrHide.bind(this);
    this.showFastest         = this.showFastest.bind(this);
    this.showSlowest         = this.showSlowest.bind(this);
    this.showTopTen          = this.showTopTen.bind(this);
    this.showBottomTen       = this.showBottomTen.bind(this);

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
    if ([ 'death_vs_pop_density'
        , 'confirmed_vs_pop_density'
        ].includes(this.props.chartType)) {
      this.isLogScaleView = true;
    }
    if (this.props.drawerItem === "Global") {
      if ([ 'death_daily'
          , 'confirmed_daily'
          ].includes(this.props.chartType)) {
        this.isLogScaleView      = true;
        this.state.isWeekView    = true;
        this.state.isDayZeroView = true;
        if (['confirmed_daily'].includes(this.props.chartType)) {
          this.state.dayZaroNum    = 30;
        }
      }
    }
  }

  componentDidUpdate() {
    if (this.hiddenLabels !== undefined) {
      this.hiddenLabels.forEach((label) => {
        this.hideDataset(label);
      });
    }
    this.logScaleView();
  }

  render() {
    var title = makeTitle(this.props.chartType);
    var chart = makeChart(this.chartReference,
                          this.yieldChartData(this.state.allChartData),
                          this.props.chartType,
                          this.chartOptions,
                          this.chartColors);
    let dialog;
    if (this.props.drawerItem === "Global") {
      dialog =
        <CoronaDialog
          datasets={this.state.datasets}
          fetchForCountry={this.props.fetchForCountry}
        />
    }

    return (
      <Card className="chart-section" variant="outlined">
        <CardContent>
          <div className="chart-buttons-section">
            <Typography variant="h6" component="h2">
              {title}
            </Typography>
            <CoronaChartControlBar
              chartType           ={this.props.chartType}
              topAndBottomNum     ={this.props.topAndBottomNum}
              isWeekView          ={this.state.isWeekView}
              isLogScaleView      ={this.isLogScaleView}
              isPerCapitaView     ={this.state.isPerCapitaView}
              isDayZeroView       ={this.state.isDayZeroView}
              dayZaroNum          ={this.state.dayZaroNum}
              showOrHide          ={this.showOrHide}
              // showFastest         ={this.showFastest}
              // showSlowest         ={this.showSlowest}
              showTopTen          ={this.showTopTen}
              showBottomTen       ={this.showBottomTen}
              toggleWeekView      ={this.toggleWeekView}
              toggleLogScaleView  ={this.toggleLogScaleView}
              togglePerCapitaView ={this.togglePerCapitaView}
              toggleDayZeroView   ={this.toggleDayZeroView}
              updateDayZeroView   ={this.updateDayZeroView}
            />
          </div>
          <div className="chart-container">{chart}</div>
        </CardContent>
        <CardActions>
          {dialog}
        </CardActions>
      </Card>
    )
  }

  updateWithGlobalPreset(result) {
    this.allChartDataOriginal = result;
    this.setState({
      allChartData: result,
      datasets: result.countries
    });
    this.hideDataset("China");
    // TODO A/B testing
    // if (hasLangCode(["sv","sv-se"])) {
    //   this.showOnlyDataset([ "Sweden"
    //                        , "Norway"
    //                        , "Denmark"
    //                        , "Finland"
    //                        , "United Kingdom"
    //                        ]);
    // }
    // this.hideRandomDataset();
  }

  updateWithNewDataset(result) {
    var oldCountries = this.allChartDataOriginal.numbers.map((x) => x.name);
    result.numbers.forEach((x, i) => {
      if (!oldCountries.includes(x.name)) {
        this.allChartDataOriginal.numbers.push(x);
      }
    });
    this.refreshState();
  }

  toggleLogScaleView() {
    this.isLogScaleView = !this.isLogScaleView;
    this.logScaleView();
  }

  toggleDayZeroView() {
    this.hiddenLabels = this.getCurrentHiddenLabels();
    this.setState({ isDayZeroView: !this.state.isDayZeroView });
  }

  toggleWeekView() {
    this.hiddenLabels = this.getCurrentHiddenLabels();
    this.setState({ isWeekView: !this.state.isWeekView });
  }

  togglePerCapitaView() {
    this.hiddenLabels = this.getCurrentHiddenLabels();
    this.setState({ isPerCapitaView: !this.state.isPerCapitaView });
  }

  updateDayZeroView(integer) {
    this.hiddenLabels = this.getCurrentHiddenLabels();
    if (this.state.isDayZeroView) {
      this.setState({ dayZaroNum: integer });
    }
  }

  refreshState() {
    this.hiddenLabels = this.getCurrentHiddenLabels();
    var newData = this.yieldChartData(this.allChartDataOriginal);
    this.setState({ allChartData: newData });
  }

  yieldChartData(oldData) {
    var newData;
    newData = this.dayZeroView(oldData);
    newData = this.perCapitaView(newData);
    newData = this.weekView(newData);
    return newData;
  }

  dayZeroView(allChartData0) {
    var chartType = this.props.chartType;
    if (this.state.isDayZeroView) {
      return update(allChartData0, {
        numbers: {
          $set: allChartData0.numbers
            .filter(x => x[chartType] !== undefined)
            .map((obj) => {
              var x = obj[chartType].findIndex((e) => e >= this.state.dayZaroNum);
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

  weekView(allChartData0) {
    var chartType = this.props.chartType;
    if (this.state.isWeekView) {
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

  perCapitaView(allChartData0) {
    var chartType = scatterDataType(this.props.chartType);
    if (this.state.isPerCapitaView) {
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
    if (this.linearCallbackOriginaly === undefined) {
      this.linearCallbackOriginaly = chart.options.scales.yAxes[0].ticks.callback
    }
    if (this.linearCallbackOriginalx === undefined) {
      this.linearCallbackOriginalx = chart.options.scales.xAxes[0].ticks.callback
    }

    if (this.isLogScaleView) {
      var logCallbackY = (value, i, values) => {
        if (value === 30000000) return "30M";
        if (value === 3000000) return "3M";
        if (value === 300000) return "300K";
        if (value === 30000) return "30K";
        if (value === 3000) return "3000";
        if (value === 300) return "300";
        if (value === 30) return "30";
        if (value === 3) return "3";
        if (value === 1000000) return "1M";
        if (value === 100000) return "100K";
        if (value === 10000) return "10K";
        if (value === 1000) return "1000";
        if (value === 100) return "100";
        if (value === 10) return "10";
        if (value === 0) return "0";
        return null;
      };
      var logCallbackX = (value, i, values) => {
        if (value === 30000000) return "30M";
        if (value === 3000000) return "3M";
        if (value === 300000) return "300K";
        if (value === 30000) return "30K";
        if (value === 3000) return "3000";
        if (value === 300) return "300";
        if (value === 30) return "30";
        if (value === 3) return "3";
        if (value === 1000000) return "1M";
        if (value === 100000) return "100K";
        if (value === 10000) return "10K";
        if (value === 1000) return "1000";
        if (value === 100) return "100";
        if (value === 10) return "10";
        if (value === 0) return "0";
        return null;
      };
      chart.options.scales.yAxes[0].type = "logarithmic";
      chart.options.scales.yAxes[0].bounds = "ticks";
      chart.options.scales.yAxes[0].ticks.callback = logCallbackY;
      if ([ 'death_vs_pop_density'
          , 'confirmed_vs_pop_density'
          ].includes(this.props.chartType)) {
        chart.options.scales.xAxes[0].type = "logarithmic";
        chart.options.scales.xAxes[0].bounds = "ticks";
        chart.options.scales.xAxes[0].ticks.callback = logCallbackX;
      }
    } else {
      chart.options.scales.yAxes[0].type = "linear";
      if ([ 'death_vs_pop_density'
          , 'confirmed_vs_pop_density'
          ].includes(this.props.chartType)) {
        chart.options.scales.xAxes[0].type = "linear";
      } else {
        chart.options.scales.xAxes[0].type = "category";
      }
      chart.options.scales.yAxes[0].ticks.callback = this.linearCallbackOriginaly;
      chart.options.scales.xAxes[0].ticks.callback = this.linearCallbackOriginalx;
    }
    chart.update();
  }

  showOrHide() {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;

    var allHidden = true;
    datasets.forEach((d, i) => {
      var meta = chart.getDatasetMeta(i);
      if (meta.hidden !== true) {
        meta.hidden = true;
        allHidden = false;
      }
    });
    if (allHidden) {
      datasets.forEach((d, i) => {
        chart.getDatasetMeta(i).hidden = null;
      });
    }
    chart.update();
  }

  showFastest(amount) {
    var dayRange = 8;
    this.showSelectedDatasets(amount, (a, b) => {
      var listA = a[this.props.chartType];
      var listB = b[this.props.chartType];
      var deltaA = listA[listA.length-1] - listA[listA.length-dayRange];
      var deltaB = listB[listB.length-1] - listB[listB.length-dayRange];
      return deltaB - deltaA;
    });
  }

  showSlowest(amount) {
    var dayRange = 8;
    this.showSelectedDatasets(amount, (a, b) => {
      var listA = a[this.props.chartType];
      var listB = b[this.props.chartType];
      var deltaA = listA[listA.length-1] - listA[listA.length-dayRange];
      var deltaB = listB[listB.length-1] - listB[listB.length-dayRange];
      return deltaA - deltaB;
    });
  }

  showTopTen(amount) {
    this.showSelectedDatasets(amount, (a, b) => {
      if (a[this.props.chartType] !== undefined && b[this.props.chartType]) {
        var listA = a[this.props.chartType];
        var listB = b[this.props.chartType];
        return listB[listB.length-1] - listA[listA.length-1];
      } else {
        return 0;
      }
    });
  }

  showBottomTen(amount) {
    this.showSelectedDatasets(amount, (a, b) => {
      if (a[this.props.chartType] !== undefined && b[this.props.chartType]) {
        var listA = a[this.props.chartType];
        var listB = b[this.props.chartType];
        return listA[listA.length-1] - listB[listB.length-1];
      } else {
        return 0;
      }
    });
  }

  showSelectedDatasets(amount, sortFun) {
    var chart = this.chartReference.current.chartInstance;
    var datasets0 = chart.data.datasets;
    var datasetLabels =
      [...this.allChartDataOriginal.numbers]
        .sort(sortFun)
        .filter((x) => x.name !== "China")
        .slice(0, amount)
        .map((x) => x.name);

    datasets0.forEach((d, i) => {
      if (datasetLabels.includes(d.label)) {
        chart.getDatasetMeta(i).hidden = null;
      } else {
        chart.getDatasetMeta(i).hidden = true;
      }
    });

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

  showOnlyDataset(countryNames) {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;
    for (var i=0; i<datasets.length; i++) {
      if(!countryNames.includes(datasets[i].label)) {
        chart.getDatasetMeta(i).hidden = true;
      }
    }
    chart.update();
  }

  hideRandomDataset() {
    var chart = this.chartReference.current.chartInstance;
    var datasets = chart.data.datasets;
    datasets.forEach((d, i) => {
      if (Math.random() < 0.5) {
        chart.getDatasetMeta(i).hidden = true;
      }
    });
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
    case "death_vs_icu_daily":
      title = "COVID-19 new cases per day";
      break;
    case "death_vs_pop_density":
      title = "COVID-19 deaths vs population density";
      break;
    case "confirmed_vs_pop_density":
      title = "COVID-19 confirmed cases vs population density";
      break;
    default:
      title = "COVID-19 data";
      break;
  }
  return title;
}

function makeChart(chartReference, allChartData, chartType, chartOptions, chartColors) {
  if ([ 'death_vs_pop_density'
      , 'confirmed_vs_pop_density'
      ].includes(chartType)) {
    return(
      <Scatter
        ref={chartReference}
        data={chartDataForScatter(allChartData, chartType, chartColors)}
        options={chartOptionsForScatter(chartType)}
        redraw
        // getDatasetAtEvent={(datasets) => {datasets.for}}
      />
    );
  } else {
    return (
      <Line
        ref={chartReference}
        data={chartDataForLine(allChartData, chartType, chartColors)}
        options={chartOptions}
        redraw
        // getDatasetAtEvent={(datasets) => {}}
      />
    );
  }
}

function chartDataForScatter(allChartData, chartType, chartColors) {
  // const allPop = allChartData.numbers.map((x) => x.population);
  // console.log(allPop);
  let datasets;
  if(!allChartData.initial_data) {
    datasets =
      allChartData.numbers.map((o, index) => {
        var popDensity = o.population / o.land_area;
        var type = scatterDataType(chartType)
        return {
          label: o.name,
          fill: true,
          backgroundColor: nextColor(chartColors, index),
          pointBorderColor: nextColor(chartColors, index),
          pointBackgroundColor: nextColor(chartColors, index),
          pointBorderWidth: 3,
          pointHoverRadius: 15,
          pointHoverBackgroundColor: nextColor(chartColors, index),
          pointHoverBorderColor: nextColor(chartColors, index),
          pointHoverBorderWidth: 2,
          pointRadius: 8,
          pointHitRadius: 10,
          data: [
            { x: popDensity, y: o[type][o[type].length-1] }
          ]
        };
      });
  } else {
    datasets = [{
      label: 'Global',
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.4)',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      data: [
        { x: 65, y: 75 },
        { x: 59, y: 49 },
        { x: 80, y: 90 },
        { x: 81, y: 29 },
        { x: 56, y: 36 },
        { x: 55, y: 25 },
        { x: 40, y: 18 },
      ]
    }];
  }
  return {
    labels: allChartData.numbers.map((x) => x.name),
    datasets: datasets
  };
}

function chartOptionsForScatter(chartType) {
  return {
    maintainAspectRatio: false,
    legend: {
       display: true,
       align: "start",
       position: "bottom",
       // onClick: function(e, legendItem) {
       //    var index = legendItem.datasetIndex;
       //    var ci = this.chart;
       //    var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;
       //
       //    ci.data.datasets.forEach(function(e, i) {
       //      var meta = ci.getDatasetMeta(i);
       //      console.log(meta);
       //
       //      if (i !== index) {
       //        if (!alreadyHidden) {
       //          meta.hidden = meta.hidden === null ? !meta.hidden : null;
       //        } else if (meta.hidden === null) {
       //          meta.hidden = true;
       //        }
       //      } else if (i === index) {
       //        meta.hidden = null;
       //      }
       //    });
       //
       //    ci.update();
       //  }
    },
    scales: {
      xAxes: [{
        // type: "logarithmic",
        scaleLabel: {
          display: true,
          labelString: 'Less dense <--      Population density      --> More dense'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: yAxisTitle(chartType),
          padding: -2
        }
      }]
    },
    tooltips: {
       callbacks: {
          label: function(tooltipItem, data) {
             var label = data.labels[tooltipItem.datasetIndex];
             return label + ': (' + tooltipItem.yLabel.toFixed(2) + ' '+sinceWord(chartType)+', ' + tooltipItem.xLabel.toFixed(2) + ' per km2)';
             // var label = data.labels[tooltipItem.index];
             // return label + ': (' + tooltipItem.xLabel + ' per km2, ' + tooltipItem.yLabel + ' deaths)';
          }
       }
    }
 };
}

function scatterDataType(chartType) {
  switch (chartType) {
    case "death_vs_pop_density":     return "death";
    case "confirmed_vs_pop_density": return "confirmed";
    default:                         return chartType;
  }
}

function yAxisTitle(chartType) {
  switch (chartType) {
    case "death_vs_pop_density":     return "Less deaths <--      COVID-19 deaths      --> More deaths";
    case "confirmed_vs_pop_density": return "Less cases <--      COVID-19 confirmed cases      --> More cases";
    default:                         return "COVID-19 cases";
  }
}

function chartDataForLine(allChartData, chartType, chartColors) {
  return {
    labels: allChartData.days,
    datasets: allChartData.numbers
      .filter(x => x[chartType] !== undefined)
      .map((x, index) => {
        var newColor = nextColor(chartColors, index);
        switch (x.name) {
          case "China":
            return chartDataSet(x.name, x[chartType], 'rgb(211,211,211)');
          default:
            return chartDataSet(x.name, x[chartType], newColor);
        }
      })
  }
}

function nextColor(chartColors, index) {
  var colorNames = Object.keys(chartColors);
  var colorName = colorNames[index % colorNames.length];
  return chartColors[colorName];
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

//TODO A/B testing
// function hasLangCode(list) {
//   var userLang = navigator.language || navigator.userLanguage;
//   var cond1 = (navigator.languages !== undefined &&
//     navigator.languages.some((x)=>list.includes(x.toLowerCase())));
//   var cond2 = (list).includes(userLang.toLowerCase());
//   return (cond1 || cond2);
// }
