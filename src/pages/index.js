import React from "react"
import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaGlobal from '../components/CoronaGlobal'
import CoronaFooter from '../components/CoronaFooter'


const IndexPage = () => (
  <Layout>
    <SEO />
    <CoronaTopBar drawerItem="Global" />
    <div className="corona-section">
      <CoronaGlobal allChartData={chartData} />
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

// this.drawerItems = ['Global'];
// const currentDrawerItem = undefined;
// const fetchForDrawer = (drawerItem) => {
//   if (this.drawerItems.includes(drawerItem) &&
//         this.currentDrawerItem !== drawerItem) {
//     // console.log("current:  " + this.currentDrawerItem);
//     this.fetchFromUrl(apiUrl(drawerItem));
//     this.currentDrawerItem = drawerItem;
//   }
// }
export default IndexPage
