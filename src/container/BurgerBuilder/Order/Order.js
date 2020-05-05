import React from "react";
import classes from "./Order.module.css";

const Order = props => {
  const { ingredients } = props;

  const ingredient = [];

  for (let ingredientName in ingredients) {
    ingredient.push({
      amount: ingredients[ingredientName],
      name: ingredientName,
    });
  }

  const ingredientOutput = ingredient.map((ig, idx) => (
    <span
      key={idx}
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "5px 8px",
        border: "1px solid #ccc",
        padding: ".35rem",
        borderRadius: "10px",
      }}
    >
      {"  "} {ig.name} {"   "}({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
