import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

export default () => {
  return (
    <AppBar className="layout-appbar" position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="layout-appbar-text">
          corona_stats
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
