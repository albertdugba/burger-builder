import * as actionTypes from "../actions/actions";
import { UpdateObject } from "../../shared/utils";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 1.5,
  meat: 1.6,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = UpdateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] + 1,
  };
  return UpdateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngs = UpdateObject(state.ingredients, updatedIng);

  const updatedSt = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] - 1,
  };
  return UpdateObject(state, updatedSt);
};

const setIngredient = (state, action) => {
  return UpdateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    error: false,
    totalPrice: 0.0,
  });
};

const fetchIngredientFail = (state, action) => {
  return UpdateObject(state, { error: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFail(state, action);

    default:
      return state;
  }
};

export default reducer;
