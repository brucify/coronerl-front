import React from "react"
import Layout from "../components/layout"
import Corona from '../components/Corona';

const IndexPage = () => (
  <Layout>
    <div className="chart" id="corona2">
      <Corona data={chartData} type="death" />
    </div>
    <div className="chart" id="corona4">
      <Corona data={chartData} type="death_daily" />
    </div>
    <div className="chart" id="corona1">
      <Corona data={chartData} type="active" />
    </div>
    <div className="chart" id="corona4">
      <Corona data={chartData} type="confirmed_daily" />
    </div>
    <div className="chart" id="corona5">
      <Corona data={chartData} type="confirmed" />
    </div>
    <div className="chart" id="corona3">
      <Corona data={chartData} type="recovered" />
    </div>
  </Layout>
)

const chartData = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  numbers:
    [{country: "XXXX",
      confirmed: [65, 59, 80, 81, 56, 55, 40]},
     {country: "XXXX",
      confirmed: [50, 32, 44, 51, 66, 75, 80]}]
};

export default IndexPage
