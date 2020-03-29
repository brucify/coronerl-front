import React from "react"
import { Helmet } from "react-helmet"
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
        <p>Data source: <a href="https://github.com/CSSEGISandData/COVID-19">Center for Systems Science and Engineering at Johns Hopkins University</a></p>
        <p>Population data: <a href="https://www.worldometers.info/world-population/population-by-country/">Worldometers</a></p>
        <p><span role="img" aria-label="virus">🦠</span> © 2020 <a href="https://github.com/brucify">@brucify</a></p>
        <p>Powered by<span> </span>
          <a rel="license" href="https://erlang.org">
            <img alt="Erlang" style={{borderWidth:0, height:15, width:15}} src="https://upload.wikimedia.org/wikipedia/commons/0/04/Erlang_logo.svg" />
          </a><span> </span>
          <a rel="license" href="https://gatsbyjs.org">
            <img alt="gatsbyjs" style={{borderWidth:0, height:15, width:15}} src="https://a.thumbs.redditmedia.com/n9ntyYdqDYujCDwSYhzPTFxe_wOSDpThOC8wJR1DwR8.png" />
          </a>
        </p>
        <p>
          <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
            <img alt="Creative Commons License" style={{borderWidth:0, height:15.5, width:44}} src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
          </a>
        </p>
      </div>
    </div>
  )
}
