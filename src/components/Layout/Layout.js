import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Fragment>
      <Toolbar
        toggleSideDrawer={sideDrawerToggleHandler}
        isAuth={props.isAuthenticated}
      />
      <Sidedrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <div>Toolbar,Sidedrawer,Backdrop</div>

      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
