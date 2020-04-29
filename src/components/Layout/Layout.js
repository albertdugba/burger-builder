import React, { Fragment, useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(true);
  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };
  return (
    <Fragment>
      <Toolbar />
      <Sidedrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <div>Toolbar,Sidedrawer,Backdrop</div>
      <div>Almost before we knew it, we had left the ground.</div>
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
