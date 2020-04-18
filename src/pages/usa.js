import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaChartGroup from '../components/CoronaChartGroup'

const chartTypes = [ {type: "death",           ref: React.createRef()}
                   , {type: "death_daily",     ref: React.createRef()}
                   , {type: "confirmed",       ref: React.createRef()}
                   , {type: "confirmed_daily", ref: React.createRef()}
                   ];

const IndexPage = () => (
  <Layout>
    <SEO title="USA - COVID19curves" />
    <CoronaTopBar />
    <div className="corona-section">
      <CoronaChartGroup
        drawerItem="USA"
        chartTypes={chartTypes}
        topAndBottomNum={10}
      />
    </div>
    <div className="copyright-section">
      <p>Data source: <OutboundLink href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">Center for Systems Science and Engineering at Johns Hopkins University</OutboundLink></p>
      <p>Population data: <OutboundLink href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">Center for Systems Science and Engineering at Johns Hopkins University</OutboundLink></p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
