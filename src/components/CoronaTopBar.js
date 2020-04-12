import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import PublicIcon from '@material-ui/icons/Public';
import InfoIcon from '@material-ui/icons/Info';

import CoronaDrawer from '../components/CoronaDrawer'

// const drawerItems = ['Global'];
const drawerItems = [ "Global"
                    , "Sweden"
                    , "Poland"
                    , "About this site"
                    ];//, 'USA'];

const drawerHref = (text) => {
  switch (text) {
    case drawerItems[0]: return "/"
    case drawerItems[1]: return "/sweden"
    case drawerItems[2]: return "/poland"
    case drawerItems[3]: return "/about"
    default:             return "/"
  }
}
const drawerIcons = (text) => {
  switch (text) {
    case drawerItems[0]: return <PublicIcon />
    case drawerItems[1]: return <PublicIcon />
    case drawerItems[2]: return <PublicIcon />
    case drawerItems[3]: return <InfoIcon />
    default:             return <InfoIcon />
  }
}

export default (props) => {
    return (
      <AppBar className="layout-appbar" position="static">
        <Toolbar variant="dense">
          <CoronaDrawer
            drawerItems={drawerItems}
            drawerHref={drawerHref}
            drawerIcons={drawerIcons}
            // fetchForDrawer={props.fetchForDrawer}
          />
          <Typography variant="h6" className="layout-appbar-text">
            COVID19 <TrendingUp /> Curves <TrendingDown />
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
