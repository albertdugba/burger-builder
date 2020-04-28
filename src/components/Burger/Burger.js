import React from "react";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

import classes from "./Burger.module.css";

const Burger = props => {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding your coffee</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default Burger;
