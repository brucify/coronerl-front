import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'
import CoronaTopBar from '../components/CoronaTopBar'
import CoronaGlobal from '../components/CoronaGlobal'

const chartTypes = [ {type: "confirmed",       ref: React.createRef()}
                   , {type: "confirmed_daily", ref: React.createRef()}
                   , {type: "death_vs_icu",    ref: React.createRef()}
                   ];

const IndexPage = () => (
  <Layout>
    <SEO />
    <CoronaTopBar />
    <div className="corona-section">
      <CoronaGlobal
        drawerItem="Sweden"
        chartTypes={chartTypes}
      />
    </div>
    <div className="copyright-section">
      <p>Data source: <OutboundLink href="https://www.dataportal.se/sv/datasets/525_1424/antal-fall-av-covid-19-i-sverige-per-dag-och-region">Folkhälsomyndigheten</OutboundLink></p>
      <p>Population data: <OutboundLink href="https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/kvartal-1-2019/">Statistikmyndigheten SCB</OutboundLink></p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
