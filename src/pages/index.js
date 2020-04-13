import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaChartGroup from '../components/CoronaChartGroup'
import CoronaFooter from '../components/CoronaFooter'

const chartTypes = [ {type: "death",           ref: React.createRef()}
                   , {type: "death_daily",     ref: React.createRef()}
                   , {type: "confirmed",       ref: React.createRef()}
                   , {type: "confirmed_daily", ref: React.createRef()}
                   , {type: "active",          ref: React.createRef()}
                   , {type: "recovered",       ref: React.createRef()}
                   , {type: "recovered_daily", ref: React.createRef()}
                   , {type: "net_daily",       ref: React.createRef()}
                   ];

const IndexPage = () => (
  <Layout>
    <SEO />
    <CoronaTopBar />
    <div className="corona-section">
      <CoronaChartGroup
        drawerItem="Global"
        chartTypes={chartTypes}
        topAndBottomNum={10}
      />
    </div>
    <div className="copyright-section">
      <p>Data source: <OutboundLink href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">Center for Systems Science and Engineering at Johns Hopkins University</OutboundLink></p>
      <p>Population data: <OutboundLink href="https://www.worldometers.info/world-population/population-by-country/">Worldometers</OutboundLink></p>
      <CoronaFooter />
    </div>
  </Layout>
)

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
