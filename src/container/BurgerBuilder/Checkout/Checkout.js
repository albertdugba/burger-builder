import React, { Component } from "react";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      meat: 1,
      salad: 2,
      cheese: 2,
      bacon: 3,
    },
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-info");
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) ingredients[param[0]] = +param[1];
    this.setState({ ingredients: ingredients });
  }

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
