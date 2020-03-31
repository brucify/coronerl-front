import React from "react"
import { Helmet } from "react-helmet"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

export default ({ children }) => {

  const data = useStaticQuery(
      graphql`
        query {
          site {
            siteMetadata {
              title,
              siteUrl,
              description,
              keyWords
            }
          }
        }
      `
  )
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.site.siteMetadata.title}</title>
        <link rel="canonical" href={data.site.siteMetadata.siteUrl} />
        <meta name="description" content={data.site.siteMetadata.description} />
        <meta name="keywords" content={data.site.siteMetadata.keyWords} />
      </Helmet>
      <div>{children}</div>
      <div className="copyright-section">
        <p>Data source: <OutboundLink href="https://github.com/CSSEGISandData/COVID-19">Center for Systems Science and Engineering at Johns Hopkins University</OutboundLink></p>
        <p>Population data: <OutboundLink href="https://www.worldometers.info/world-population/population-by-country/">Worldometers</OutboundLink></p>
        <p><span role="img" aria-label="virus">🦠</span> © 2020 <OutboundLink href="https://github.com/brucify">@brucify</OutboundLink></p>
        <p>Powered by<span> </span>
          <OutboundLink rel="license" href="https://erlang.org">
            <img alt="Erlang" style={{borderWidth:0, height:15, width:15}} src="https://upload.wikimedia.org/wikipedia/commons/0/04/Erlang_logo.svg" />
          </OutboundLink><span> </span>
          <OutboundLink rel="license" href="https://gatsbyjs.org">
            <img alt="gatsbyjs" style={{borderWidth:0, height:15, width:15}} src="https://a.thumbs.redditmedia.com/n9ntyYdqDYujCDwSYhzPTFxe_wOSDpThOC8wJR1DwR8.png" />
          </OutboundLink>
        </p>
        <p>
          <OutboundLink rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" style={{borderWidth:0, height:15.5, width:44}} src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
          </OutboundLink>
        </p>
      </div>
    </div>
  )
}
