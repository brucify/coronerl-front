import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

import Layout from "../components/layout"
import SEO from '../components/SEO'
import CoronaFooter from '../components/CoronaFooter'
import CoronaTopBar from '../components/CoronaTopBar'

const IndexPage = () => (
  <Layout>
    <SEO />
    <CoronaTopBar />
    <div className="about-section">
      <p>Here's the main source of inspiration of this site: </p>
      <p><OutboundLink href="https://medium.com/@tomaspueyo/coronavirus-the-hammer-and-the-dance-be9337092b56">Coronavirus: The Hammer and the Dance - Tomas Pueyo</OutboundLink></p>
      <p>Data source:</p>
      <p><OutboundLink href="https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6">Center for Systems Science and Engineering at Johns Hopkins University</OutboundLink> &nbsp;(Global)</p>
      <p><OutboundLink href="https://www.dataportal.se/sv/datasets/525_1424/antal-fall-av-covid-19-i-sverige-per-dag-och-region">Folkhälsomyndigheten</OutboundLink> (Sweden)</p>
      <p>Population data:</p>
      <p><OutboundLink href="https://www.worldometers.info/world-population/population-by-country/">Worldometers</OutboundLink> (Global)</p>
      <p><OutboundLink href="https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/kvartal-1-2019/">Statistikmyndigheten SCB</OutboundLink> (Sweden)</p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
