import React from "react"
import Layout from "../components/layout"
import Corona from '../components/Corona'

const IndexPage = () => (
  <Layout>
    <div className="all-charts">
      <Corona allChartData={chartData} />
    </div>
  </Layout>
)

const chartData = {
  days: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  numbers:
    [{country: "XXXX",
      confirmed: [65, 59, 80, 81, 56, 55, 40]},
     {country: "XXXX",
      confirmed: [50, 32, 44, 51, 66, 75, 80]}]
};

export default IndexPage
