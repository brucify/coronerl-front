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
      <p><OutboundLink href="https://github.com/dtandev/coronavirus">GeoSiN Scientific Club Members from University of Warmia and Mazury in Olsztyn, Poland</OutboundLink> (Poland)</p>
      <p>Population data:</p>
      <p><OutboundLink href="https://www.worldometers.info/world-population/population-by-country/">Worldometers</OutboundLink> (Global)</p>
      <p><OutboundLink href="https://www.scb.se/hitta-statistik/statistik-efter-amne/befolkning/befolkningens-sammansattning/befolkningsstatistik/pong/tabell-och-diagram/kvartals--och-halvarsstatistik--kommun-lan-och-riket/kvartal-1-2019/">Statistikmyndigheten SCB</OutboundLink> (Sweden)</p>
      <p><OutboundLink href="https://stat.gov.pl/obszary-tematyczne/ludnosc/ludnosc/ludnosc-stan-i-struktura-w-przekroju-terytorialnym-stan-w-dniu-30-06-2019,6,26.html">Główny Urząd Statystyczny</OutboundLink> (Poland)</p>
      <p><OutboundLink href="https://support.google.com/analytics/answer/6004245">Privacy notice</OutboundLink></p>
      <img alt="Hack the crisis" style={{borderWidth:0, height:100, width:100}} src="/images/Hack the crisis - black transp.png" />
      <p>A submission to <OutboundLink href="https://www.hackthecrisis.se/">Hack the Crisis hackathon 2020</OutboundLink> in Sweden, <OutboundLink href="https://www.guaana.com/challenges/PAScgtXfAYDsaqjtp/results/zMRLepRnXNxoChj5x">Save Lives Digital Solution</OutboundLink> track.</p>
      <CoronaFooter />
    </div>
  </Layout>
)

export default IndexPage
