import React from "react"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CoronaDrawer from '../components/CoronaDrawer'

export default (props) => {
    return (
      <AppBar className="layout-appbar" position="static">
        <Toolbar variant="dense">
          <CoronaDrawer
            drawerItems={props.drawerItems}
            fetchAndUpdateType={props.fetchAndUpdateType}
          />
          <Typography variant="h6" className="layout-appbar-text">
            corooona_stats
          </Typography>
        </Toolbar>
      </AppBar>
    )
}
