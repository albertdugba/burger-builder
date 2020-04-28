import React, { Fragment } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = props => {
  return (
    <Fragment>
      <Toolbar />
      <div>Toolbar,Sidedrawer,Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
