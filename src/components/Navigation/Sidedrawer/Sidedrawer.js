import React from "react";

import classes from "./Sidedrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const Sidedrawer = props => {
  return (
    <div>
      <Logo />
      <nav className={classes.Sidedrawer}>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Sidedrawer;
