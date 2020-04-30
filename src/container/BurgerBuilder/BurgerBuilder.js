import React, { Component, Fragment } from "react";
import axios from "axios";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Ordersummary from "../../components/Burger/Ordersummary/Ordersummary";
import axiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "./hoc/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1.5,
  meat: 1.6,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchaseMode: false,
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
    this.setState({ purchaseable: sum > 0 });
  };
  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseContinueHandler = () => {
    // this.setState({ loading: true });
    // const orders = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: "Bernice",
    //     address: {
    //       street: "Sesame Street",
    //       zipCode: "12321",
    //       country: "Ghana",
    //     },
    //     email: "test@test.com",
    //   },
    //   deliveryMethod: "fastest",
    // };
    // axiosInstance
    //   .post("/orders.json", orders)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //     console.log(error);
    //   });
    this.props.history.push("/checkout");
    console.log(this.props);
  };

  componentDidMount() {
    axios
      .get("https://burger-react-app-7c56b.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchaseable={this.state.purchaseable}
            ordered={this.purchaseModeHandler}
          />
        </Fragment>
      );

      orderSummary = (
        <Ordersummary
          ingredients={this.state.ingredients}
          purchasedCancel={this.purchaseCancelhandler}
          purchasedContinue={this.purchaseContinueHandler}
        />
      );

      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
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

export default withErrorHandler(BurgerBuilder, axiosInstance);
