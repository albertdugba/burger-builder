import React, { Component } from "react";
import Button from "../../../../components/UI/Button/Button";
import axiosInstance from "../../../../axios-orders";

import classes from "./ContactInfo.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";

class ContactInfo extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Mail",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },

    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
    const formElementArr = [];
    for (let key in this.state.orderForm) {
      formElementArr.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form>
        {/* <Input elementType={} elementConfig={} value={} /> */}
        {formElementArr.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button inputType="input" btnType="Success" clicked={this.orderHandler}>
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
