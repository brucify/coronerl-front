import React from "react"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';
import { OutboundLink } from "gatsby-plugin-google-gtag"

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default (props) => {
  // const clickables = ['Global', 'Sweden', 'USA'];
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event !== undefined) {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      if (open === false) {
        console.log(event.target.innerText);
      }
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {props.drawerItems.map((text, index) => {
          var href = props.drawerHref(text);
          return (
            <OutboundLink className="drawer-items" href={href}>
              <ListItem button key={text}>
                  <ListItemIcon><PublicIcon /></ListItemIcon>
                  <ListItemText primary={text} />
              </ListItem>
            </OutboundLink>
          )
        })}
      </List>
    </div>
  );

  var anchor = "left";
  return (
    <React.Fragment key={anchor}>
      <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
        {list(anchor)}
      </SwipeableDrawer>
    </React.Fragment>
  )
}
