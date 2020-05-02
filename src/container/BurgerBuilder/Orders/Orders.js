import React, { Component } from "react";
import axiosInstance from "../../../axios-orders";

import Order from "../Order/Order";
import withErrorHandler from "../hoc/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axiosInstance
      .get("/orders.json")
      .then(response => {
        const fetchtedOrders = [];
        for (let key in response.data) {
          fetchtedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ orders: fetchtedOrders, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    console.log(this.state.orders);
    return (
      <div>
        {this.state.orders.map(order => {
          console.log(order.price);
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axiosInstance);
