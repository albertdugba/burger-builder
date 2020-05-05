import React, { Component, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import CheckoutSummary from "../../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactInfo from "./ContactInfo/ContactInfo";
class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-info");
  };
  componentWillMount() {
    this.props.onPurchaseInit();
  }

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-info"}
            component={ContactInfo}
          />
        </Fragment>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.orderReducer.purchased,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
