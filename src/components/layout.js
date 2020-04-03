import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import CoronaTopBar from '../components/CoronaTopBar'

export default ({ children }) => {
  return (
    <div>
      <CoronaTopBar />
      <div className="layout-parent">{children}</div>
    </div>
  )
}
