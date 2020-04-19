import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaChartGroup from '../components/CoronaChartGroup'

const chartTypes = [ {type: "confirmed",       ref: React.createRef()}
                   , {type: "confirmed_daily", ref: React.createRef()}
                   , {type: "confirmed_vs_pop_density", ref: React.createRef()}
                   , {type: "death_vs_icu",    ref: React.createRef()}
                   , {type: "death_vs_icu_daily",    ref: React.createRef()}
                   ];

const IndexPage = () => (
  <Layout>
    <SEO title="Sweden - COVID19curves" />
    <CoronaTopBar />
    <div className="corona-section">
      <CoronaChartGroup
        drawerItem="Sweden"
        chartTypes={chartTypes}
        topAndBottomNum={5}
      />
    </div>
    <div className="copyright-section">
      <p>Data source: <OutboundLink href="https://www.dataportal.se/sv/datasets/525_1424/antal-fall-av-covid-19-i-sverige-per-dag-och-region">Folkhälsomyndigheten</OutboundLink></p>
      <p>Population data: <OutboundLink href="https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/kvartal-1-2019/">Statistikmyndigheten SCB</OutboundLink></p>
      <p>Land area: <OutboundLink href="https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/">Statistikmyndigheten SCB</OutboundLink></p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
