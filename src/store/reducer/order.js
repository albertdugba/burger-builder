import * as actionTypes from "../actions/actions";
import { UpdateObject } from "../../shared/utils";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return UpdateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
  return UpdateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = UpdateObject(action.orderData, { id: action.orderId });
  return UpdateObject(state, {
    orders: state.orders.concat(newOrder),
    loading: false,
    purchased: true,
  });
};
const fetchBurgerFailed = (state, action) => {
  return UpdateObject(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return UpdateObject(state, { orders: action.orders, loading: false });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case actionTypes.PURCHASE_BURGER_FAILED:
      return UpdateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_START:
      return fetchBurgerFailed(state, action);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);

    case actionTypes.FETCH_ORDERS_FAILED:
      return UpdateObject(state, { loading: false });

    default:
      return state;
  }
};

export default reducer;
