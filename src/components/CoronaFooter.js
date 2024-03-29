import React from "react"
import { OutboundLink } from "gatsby-plugin-google-gtag"

export default () => {
  return (
    <div className="copyright-section">
      <p><span role="img" aria-label="virus">🦠</span> © 2020 <OutboundLink href="https://github.com/brucify">@brucify</OutboundLink></p>
      <p>Powered by<span> </span>
        <OutboundLink rel="license" href="https://erlang.org">
          <img alt="Erlang" style={{borderWidth:0, height:15, width:15}} src="https://upload.wikimedia.org/wikipedia/commons/0/04/Erlang_logo.svg" />
        </OutboundLink><span> </span>
        <OutboundLink rel="license" href="https://gatsbyjs.org">
          <img alt="gatsbyjs" style={{borderWidth:0, height:15, width:15}} src="https://a.thumbs.redditmedia.com/n9ntyYdqDYujCDwSYhzPTFxe_wOSDpThOC8wJR1DwR8.png" />
        </OutboundLink>
      </p>
      <p>Follow <OutboundLink href="https://twitter.com/covid19curves">@covid19curves</OutboundLink> on Twitter</p>
      <p>
        <OutboundLink rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          <img alt="Creative Commons License" style={{borderWidth:0, height:15.5, width:44}} src="https://i.creativecommons.org/l/by/4.0/88x31.png" />
        </OutboundLink>
      </p>
    </div>
  )
}
