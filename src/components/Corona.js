import React from 'react';
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaChart from '../components/CoronaChart'

class Corona extends React.Component {
  constructor(props) {
    super(props);
    this.allChartDataPrevious = undefined;
    this.chartReference = React.createRef();
    this.chartTypes = [ {type: "death",           ref: React.createRef()}
                      , {type: "death_daily",     ref: React.createRef()}
                      , {type: "confirmed",       ref: React.createRef()}
                      , {type: "confirmed_daily", ref: React.createRef()}
                      , {type: "active",          ref: React.createRef()}
                      , {type: "recovered",       ref: React.createRef()}
                      , {type: "recovered_daily", ref: React.createRef()}
                      , {type: "net_daily",       ref: React.createRef()}
                      ];
    this.drawerItems = ['Global', 'Sweden', 'USA'];
    this.fetchAndUpdateType = this.fetchAndUpdateType.bind(this);
  }

  componentDidMount() {
    this.fetchAndUpdateType();
  }

  render() {
    const charts = this.chartTypes.map((o) => {
      return <CoronaChart
               ref={o.ref}
               chartType={o.type}
               allChartData={this.props.allChartData}
             />
    });

    return (
      <div className="corona-parent">
        <CoronaTopBar
          drawerItems={this.drawerItems}
          fetchAndUpdateType={this.fetchAndUpdateType}
        />
        <div className="all-charts-section">
          {charts}
        </div>
      </div>
    )
  }

  fetchAndUpdateType() {
    fetch(apiUrl())
      .then(res => res.json())
      .then(
        (result) => {
          this.chartTypes.map((o) => {
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

export default Corona;

function apiUrl() {
    if (process.env.NODE_ENV === 'production') {
      return "https://api.coronastats.nu/hello";
    } else {
      return "http://localhost:8080/hello";
    }
  }
