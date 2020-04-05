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

  }

  componentDidMount() {
    this.fetchFromUrl(apiUrl(this.props.drawerItem));
  }

  render() {
    const charts = this.props.chartTypes.map((o) => {
      return <CoronaChart
               ref={o.ref}
               chartType={o.type}
               allChartData={initialChartData}
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

  fetchFromUrl(url) {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // var fetchedTypes = Object.keys(result.numbers[0]);
          // this.props.chartTypes.forEach((o, i) => {
          //   if (fetchedTypes.includes(o.type)) {
          //     o.ref.current.updateData(result);
          //   }
          // });
          this.props.chartTypes.map((o) => {
            o.ref.current.updateData(result);
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

function apiUrl(drawerItem) {
    if (process.env.NODE_ENV === 'production') {
      switch (drawerItem) {
        case "Global":
          return "https://api.coronastats.nu/global";
        case "Sweden":
          return "https://api.coronastats.nu/sweden";
        default:
          return "https://api.coronastats.nu/global";
      }
    } else {
      switch (drawerItem) {
        case "Global":
          return "http://localhost:8080/global";
        case "Sweden":
          return "http://localhost:8080/sweden";
        default:
          return "http://localhost:8080/global";
      }
    }
  }
