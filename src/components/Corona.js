import React from 'react';
import CoronaChart from '../components/CoronaChart'

class Corona extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChartData: props.chartData
    };
    this.chartReference = React.createRef();
    this.chartTypes = [ "death"
                      , "death_daily"
                      , "active"
                      , "confirmed_daily"
                      , "confirmed"
                      , "recovered"
                      ];
  }

  componentDidMount() {
    fetch("http://localhost:8080/hello")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            allChartData: result
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

  render() {
    return this.chartTypes.map((chartType) => {
      return <CoronaChart
               chartType={chartType}
               allChartData={this.state.allChartData}
             />
    });
  }
}

export default Corona;
