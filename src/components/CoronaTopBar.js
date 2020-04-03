import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import CoronaDrawer from '../components/CoronaDrawer'

export default () => {
  return (
    <AppBar className="layout-appbar" position="static">
      <Toolbar variant="dense">
        <CoronaDrawer />
        <Typography variant="h6" className="layout-appbar-text">
          corona_stats
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
