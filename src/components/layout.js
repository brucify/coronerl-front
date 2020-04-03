import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

export default ({ children }) => {
  return (
    <div>
      <div className="layout-parent">{children}</div>
    </div>
  )
}
