import React from "react";

import classes from "./Sidedrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = props => {
  return (
    <div className={classes.Sidedrawer}>
      <div>
        <Logo />
      </div>
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default Sidedrawer;
