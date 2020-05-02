import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import axiosInstance from "../../../../axios-orders";

import classes from "./ContactInfo.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class ContactInfo extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = event => {
    console.log(this.props.price);
    event.preventDefault();
    this.setState({ loading: true });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Kent",
        address: {
          street: "Sesame Street",
          zipCode: "12321",
          country: "Ghana",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axiosInstance
      .post("/orders.json", orders)
      .then(response => {
        this.setState({ loading: false });
        console.log(response.data);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };
  render() {
    let form = (
      <form>
        <input
          type="text"
          className={classes.Input}
          name="name"
          placeholder="Your Name"
        />
        <input
          type="email"
          className={classes.Input}
          name="email"
          placeholder="Your Mail"
        />
        <input
          type="text"
          className={classes.Input}
          name="street"
          placeholder="Street"
        />
        <input
          type="text"
          className={classes.Input}
          name="postal"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactInfo}>
        <h4>Please Enter Your Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactInfo;
