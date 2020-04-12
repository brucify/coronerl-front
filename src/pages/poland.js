import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaGlobal from '../components/CoronaGlobal'

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
      <CoronaGlobal
        drawerItem="Poland"
        chartTypes={chartTypes}
        topAndBottomNum={5}
      />
    </div>
    <div className="copyright-section">
      <p>Data source: <OutboundLink href="https://github.com/dtandev/coronavirus">GeoSiN Scientific Club Members from University of Warmia and Mazury in Olsztyn, Poland</OutboundLink></p>
      <p>Population data: <OutboundLink href="https://stat.gov.pl/obszary-tematyczne/ludnosc/ludnosc/ludnosc-stan-i-struktura-w-przekroju-terytorialnym-stan-w-dniu-30-06-2019,6,26.html">Główny Urząd Statystyczny
</OutboundLink></p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
