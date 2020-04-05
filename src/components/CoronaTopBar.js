import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TrendingUp from '@material-ui/icons/TrendingUp';
import TrendingDown from '@material-ui/icons/TrendingDown';
import CoronaDrawer from '../components/CoronaDrawer'

// const drawerItems = ['Global'];
const drawerItems = ['Global', 'Sweden'];//, 'USA'];
const drawerHref = (text) => {
  switch (text) {
    case "Global": return "/"
    case "Sweden": return "/sweden"
    default:       return "/"
  }
}

export default (props) => {
    return (
      <AppBar className="layout-appbar" position="static">
        <Toolbar variant="dense">
          <CoronaDrawer
            drawerItems={drawerItems}
            drawerHref={drawerHref}
            // fetchForDrawer={props.fetchForDrawer}
          />
          <Typography variant="h6" className="layout-appbar-text">
            COVID19 <TrendingUp /> Curves <TrendingDown />
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
