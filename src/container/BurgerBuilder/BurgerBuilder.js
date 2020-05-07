import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import * as burgerBuilderActions from "../../store/actions/index";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Ordersummary from "../../components/Burger/Ordersummary/Ordersummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./hoc/withErrorHandler";

const BurgerBuilder = props => {
  const [purchaseMode, setPurchaseMode] = useState(false);
  const { onInitIngredients } = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const purchaseModeHandler = () => {
    if (props.isAuthenticated) {
      setPurchaseMode(true);
    } else {
      props.onSethAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelhandler = () => {
    setPurchaseMode(false);
  };

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchased();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

  if (props.ings) {
    burger = (
      <Fragment>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientsAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchaseable={updatePurchaseState(props.ings)}
          ordered={purchaseModeHandler}
          isAuth={props.isAuthenticated}
        />
      </Fragment>
    );

    orderSummary = (
      <Ordersummary
        ingredients={props.ings}
        price={props.price}
        purchasedCancel={purchaseCancelhandler}
        purchasedContinue={purchaseContinueHandler}
      />
    );
  }

  return (
    <Fragment>
      <Modal show={purchaseMode} modalClosed={purchaseCancelhandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.authReducer.token != null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: name =>
      dispatch(burgerBuilderActions.addIngredient(name)),
    onIngredientRemoved: name =>
      dispatch(burgerBuilderActions.removeIngredient(name)),

    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchased: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSethAuthRedirectPath: path =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axiosInstance));
