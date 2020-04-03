import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import TopBar from '../components/TopBar'

export default ({ children }) => {
  return (
    <div>
      <TopBar />
      <div className="layout-parent">{children}</div>
    </div>
  )
}
