/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "COVID19curves",
    titleTemplate: "%s - Compare the coronavirus curves per country",
    description: "Compare the coronavirus COVID-19 curves per country",
    url: "https://www.covid19curves.nu",
    image: "/images/preview-667x375.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@brucify",
    keyWords: "Which countries are flattening the COVID-19 curve, coronavirus, graph, statistics, covid-19 curves, chart, flatten the curve, The Hammer and the Dance, Where is my country on the Coronavirus curve"
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-162273092-1", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          optimize_id: "GTM-5QTT4GP",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: [
            // "/preview/**", "/do-not-track/me/too/"
          ],
        },
      },
    },
  ]
}
