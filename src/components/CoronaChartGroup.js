import React from 'react';
import CoronaChart from '../components/CoronaChart'

const initialChartData = {
  initial_data: true,
  days: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  numbers:
    [{name: "XXXX",
      confirmed: [65, 59, 80, 81, 56, 55, 40]},
     {name: "XXXX",
      confirmed: [50, 32, 44, 51, 66, 75, 80]}]
};

class CoronaChartGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { allChartData: initialChartData
                 , datasets:     []
                 };
    this.chartReference = React.createRef();
    this.fetchForCountry = this.fetchForCountry.bind(this);
  }

  componentDidMount() {
    this.fetchPreset(this.props.drawerItem);
  }

  render() {
    const charts = this.props.chartTypes.map((o) => {
      return <CoronaChart
               ref={o.ref}
               chartType={o.type}
               drawerItem={this.props.drawerItem}
               topAndBottomNum={this.props.topAndBottomNum}
               allChartData={this.state.allChartData}
               datasets={this.state.datasets}
               fetchForCountry={this.fetchForCountry}
             />
    });

    return (
      <div className="corona-global-parent">
        <div className="all-charts-section">
          {charts}
        </div>
      </div>
    )
  }

  fetchPreset(drawerItem) {
    var url = apiUrl(drawerItem)
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // var fetchedTypes = Object.keys(result.numbers[0]);
          // this.props.chartTypes.forEach((o, i) => {
          //   if (fetchedTypes.includes(o.type)) {
          //     o.ref.current.updateWithGlobalPreset(result);
          //   }
          // });
          mendForCn(result);
          this.updateWithGlobalPreset(result);
          // this.props.chartTypes.map((o) => {
          //   o.ref.current.updateWithGlobalPreset(result);
          //   return o;
          // });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  updateWithGlobalPreset(result) {
    this.setState({
      allChartData: result,
      datasets: result.countries
    });
    this.props.chartTypes.map((o) => {
      o.ref.current.hideDataset("US");
      // o.ref.current.hideDataset("China");
      // TODO A/B testing
      // if (hasLangCode(["sv","sv-se"])) {
      //   o.ref.current.showOnlyDataset([ "Sweden"
      //                        , "Norway"
      //                        , "Denmark"
      //                        , "Finland"
      //                        , "United Kingdom"
      //                        ]);
      // }
      // o.ref.current.hideRandomDataset();
      return o;
    });
  }

  fetchForCountry(ids) {
    var url = apiUrl("GlobalId") + "/" + ids.join(",");
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          mendForCn(result);
          this.props.chartTypes.map((o) => {
            o.ref.current.setCurrentHiddenLabels();
            return o;
          });
          this.updateWithNewDataset(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  updateWithNewDataset(result) {
    var oldCountries = this.state.allChartData.numbers.map((x) => x.name);
    result.numbers.forEach((x, i) => {
      if (!oldCountries.includes(x.name)) {
        this.setState({
          allChartData: {...this.state.allChartData, numbers: [...this.state.allChartData.numbers, x]}
        });
      }
    });
  }
}

export default CoronaChartGroup;

function apiUrl(key) {
    if (process.env.NODE_ENV === 'production') {
      switch (key) {
        case "Global":
          return "https://api.covid19curves.nu/global";
        case "GlobalId":
          return "https://api.covid19curves.nu/global";
        case "Sweden":
          return "https://api.covid19curves.nu/sweden";
        case "Poland":
          return "https://api.covid19curves.nu/poland";
        case "USA":
          return "https://api.covid19curves.nu/usa";
        default:
          return "https://api.covid19curves.nu/global";
      }
    } else {
      switch (key) {
        case "Global":
          return "http://localhost:8080/global";
        case "GlobalId":
          return "http://localhost:8080/global";
        case "Sweden":
          return "http://localhost:8080/sweden";
        case "Poland":
          return "http://localhost:8080/poland";
        case "USA":
          return "http://localhost:8080/usa";
        default:
          return "http://localhost:8080/global";
      }
    }
  }

function mendForCn(result) {
  mendData(result, ["zh","zh-cn","zh-hans"], (x) => !["Taiwan*"].includes(x.name));
}

function mendData(result, list, filterFun) {
  var userLang = navigator.language || navigator.userLanguage;
  var cond1 = (navigator.languages !== undefined &&
    navigator.languages.some((x)=>list.includes(x.toLowerCase())));
  var cond2 = (list).includes(userLang.toLowerCase());
  if(cond1 || cond2) {
    result.numbers = result.numbers.filter(filterFun);
  }
}
