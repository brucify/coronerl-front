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
              description
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
      </Helmet>
      <div>{children}</div>
    </div>
  )
}
