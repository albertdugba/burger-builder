import React, { useEffect } from "react";
import { connect } from "react-redux";
import axiosInstance from "../../../axios-orders";

import * as actions from "../../../store/actions/order";
import Order from "../Order/Order";
import withErrorHandler from "../hoc/withErrorHandler";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Orders = props => {
  const { onFetchOrders, token, userId } = props;
  useEffect(() => {
    onFetchOrders(token, userId);
  }, [onFetchOrders, token, userId]);

  let orders = null;

  if (props.loading) {
    orders = <Spinner />;
  } else {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return <div>{orders}</div>;
};

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axiosInstance));
