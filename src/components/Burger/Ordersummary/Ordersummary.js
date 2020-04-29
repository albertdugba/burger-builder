import React, { Fragment, Component } from "react";
import Button from "../../UI/Button/Button";

class Ordersummary extends Component {
  componentWillUpDatet() {
    console.log("[OderSummary Will Update]");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>Delicious Burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchasedCancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchasedContinue}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default Ordersummary;
