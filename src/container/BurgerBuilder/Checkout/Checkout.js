import React, { Component } from "react";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 4,
    },
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-info");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}
export default Checkout;
