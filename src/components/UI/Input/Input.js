import React from "react";

import classes from "./Input.module.css";

const Input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label htmlFor={props.label} className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
