import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "../NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        BurgerBuilder
      </NavigationItem>
      <NavigationItem>Checkout</NavigationItem>
      <NavigationItem>Login</NavigationItem>
      <NavigationItem>Buy</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
