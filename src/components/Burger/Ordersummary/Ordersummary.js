import React, { Fragment } from "react";

const Ordersummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Delicious Burger with the following ingredients</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Fragment>
  );
};

export default Ordersummary;
