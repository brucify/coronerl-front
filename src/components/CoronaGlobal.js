import React from 'react';
import CoronaChart from '../components/CoronaChart'

const initialChartData = {
  days: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  numbers:
    [{name: "XXXX",
      confirmed: [65, 59, 80, 81, 56, 55, 40]},
     {name: "XXXX",
      confirmed: [50, 32, 44, 51, 66, 75, 80]}]
};

class CoronaGlobal extends React.Component {
  constructor(props) {
    super(props);
    this.allChartDataPrevious = undefined;
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
               allChartData={initialChartData}
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
          this.props.chartTypes.map((o) => {
            o.ref.current.updateWithGlobalPreset(result);
            return o;
          });
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

  fetchForCountry(ids) {
    var url = apiUrl("GlobalId") + "/" + ids.join(",");
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          mendForCn(result);
          this.props.chartTypes.map((o) => {
            o.ref.current.updateWithNewDataset(result);
            return o;
          });
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
}

export default CoronaGlobal;

function apiUrl(key) {
    if (process.env.NODE_ENV === 'production') {
      switch (key) {
        case "Global":
          return "https://api.coronastats.nu/global";
        case "GlobalId":
          return "https://api.coronastats.nu/global";
        case "Sweden":
          return "https://api.coronastats.nu/sweden";
        case "Poland":
          return "https://api.coronastats.nu/poland";
        default:
          return "https://api.coronastats.nu/global";
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
