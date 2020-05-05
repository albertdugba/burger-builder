import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as burgerBuilderActions from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Ordersummary from "../../components/Burger/Ordersummary/Ordersummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./hoc/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    loading: false,
    error: false,
  };

  purchaseModeHandler = () => {
    this.setState({ purchaseMode: true });
  };

  purchaseCancelhandler = () => {
    this.setState({ purchaseMode: false });
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseModeHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <Ordersummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchasedCancel={this.purchaseCancelhandler}
          purchasedContinue={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchaseMode}
          modalClosed={this.purchaseCancelhandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: name =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: name =>
      dispatch(burgerBuilderActions.removeIngredient(name)),

    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axiosInstance));
