/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "CoronaStats - COVID-19 live stats by country",
    siteUrl: "https://www.coronastats.nu",
    description: "Tracking the coronavirus curves by country",
    keyWords: "coronavirus, covid-19 graph, covid-19 stats, covid-19 curves, covid-19 chart, flatten the curve, The Hammer and the Dance, Where is my country on the Coronavirus curve"
  },
  plugins: [`gatsby-plugin-react-helmet`]
}
