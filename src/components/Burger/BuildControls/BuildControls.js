import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "../BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <h4>Current Price: {props.price.toFixed(2)}</h4>
      {controls.map(ctrl => (
        <BuildControl
          label={ctrl.label}
          key={ctrl.type}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        disabled={!props.purchaseable}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
