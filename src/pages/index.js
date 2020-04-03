import React from "react"
import Layout from "../components/layout"
import Corona from '../components/Corona'
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'

const IndexPage = () => (
  <Layout>
    <SEO />
    <div className="all-charts-section">
      <Corona allChartData={chartData} />
    </div>
    <div className="copyright-section">
      <CoronaFooter />
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
