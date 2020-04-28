import React, { Fragment } from "react";
import Button from "../../UI/Button/Button";

const Ordersummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
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
      <Button btnType="Danger" clicked={props.purchasedCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchasedContinue}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default Ordersummary;
