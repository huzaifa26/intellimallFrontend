import React, { useEffect } from "react";
import { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button } from "@material-ui/core";

import logo from "./Logo Image/Logo.png"

import DashboardIcon from "@material-ui/icons/Dashboard";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  typo:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "64px"
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: "50px",
  },
  active: {
    borderLeft: "5px solid #2979ff",
    backgroundColor: "#2979ff26",
    "& span": {
      fontWeight: 600,
      color: "#3774ff",
    },
    "& .MuiListItemIcon-root": {
      minWidth: 50,
      color: "#3774ff",
    },
    marginTop: "10px",
    marginBottom: "10px",
    padding: "15px",
  },
  noActive: {
    "& .MuiListItemIcon-root": {
      marginLeft: 5,
      minWidth: 50,
    },
    marginTop: "10px",
    marginBottom: "10px",
    padding: "15px",
  },
}));

function AdminLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const history = useHistory();
  useEffect(()=>{
    listOnClick();
  },[])

  const itemsList = [
    {
      text: "Dashboard",
      route: "/dashboard",
      onClick: () => history.push("/dashboard"),
      icon: <DashboardIcon />,
    },
    {
      text: "All Orders",
      route: "/allorders",
      onClick: () => history.push("/allorders"),
      icon: <SupervisorAccountIcon />,
    },
    {
      text: "User",
      route: "/user",
      onClick: () => history.push("/user"),
      icon: <PersonIcon />,
    },
    {
      text: "Products",
      route: "/products",
      onClick: () => history.push("/products"),
      icon: <GroupIcon />,
    }
    
  ];

  const [titleName,setTitleName]=useState("Dash Board")


  const listOnClick = () => {
    if(props.history.location.pathname === "/dashboard"){
      setTitleName("Dashboard");
    }

    if(props.history.location.pathname === "/allorders"){
      setTitleName("All Orders");
    }

    if(props.history.location.pathname === "/user"){
      setTitleName("Users");
    }

    if(props.history.location.pathname === "/products"){
      setTitleName("Products");
    }
    if(props.history.location.pathname === "/addProduct"){
      setTitleName("Add Products");
    }
    if(props.history.location.pathname === "/editproduct"){
      setTitleName("Edit Products");
    }
  }

  const drawer = (
    <div> 
      <div className={classes.toolbar}>
          <Typography variant="h6" className={classes.typo} noWrap>
            <img style={{height:"70px", width:"70px"}} src={logo} alt={"logo"}/>
          </Typography>  
      </div>
      <Divider />
      <List onClick={listOnClick}>
        {itemsList.map((item, index) => {
          const { text, icon, onClick, route } = item;
          return (
            <ListItem
              button
              key={text}
              className={
                props.history.location.pathname == route
                  ? classes.active
                  : classes.noActive
              }
              onClick={onClick}
            >
              {icon && <ListItemIcon> {icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <Button
        style={{ marginLeft: "55px" }}
        startIcon={<ExitToAppIcon />}
        color="primary"
        variant="contained"
        onClick={() => history.push("/")}
      >
        Logout
      </Button>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon></MenuIcon>
          </IconButton>

          
          <Typography variant="h6" noWrap>
            {titleName}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{props.body}</main>
    </div>
  );
}

export default withRouter(AdminLayout);
