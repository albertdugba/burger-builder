import React from "react";

import classes from "./Sidedrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const Sidedrawer = props => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />

      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Sidedrawer;
