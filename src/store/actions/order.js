import * as actionTypes from "./actions";
import axiosInstance from "../../axios-orders";
import { fetchIngredientsFailed } from "./burgerBuilder";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axiosInstance
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrderSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrderStart());
    axiosInstance
      .get("/orders.json")
      .then(response => {
        const fetchtedOrders = [];
        for (let key in response.data) {
          fetchtedOrders.push({ ...response.data[key], id: key });
        }
        dispatch(fetchOrderSuccess(fetchOrders));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
};
