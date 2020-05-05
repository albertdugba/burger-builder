import * as actionTypes from "../actions/actions";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        orderId: action.id,
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
        purchased: true,
      };

    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
