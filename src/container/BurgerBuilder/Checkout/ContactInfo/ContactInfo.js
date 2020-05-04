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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },

      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
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
        valid: true,
        validation: {},
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const formData = {};
    for (let formElId in this.state.orderForm) {
      formData[formElId] = this.state.orderForm[formElId].value;
    }
    const orders = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
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

  checkFormValidation = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== " " && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormEl = { ...updatedOrderForm[inputId] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.touched = true;
    updatedFormEl.valid = this.checkFormValidation(
      updatedFormEl.value,
      updatedFormEl.validation,
    );
    updatedOrderForm[inputId] = updatedFormEl;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
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
      <form onSubmit={this.orderHandler}>
        {formElementArr.map(formElement => (
          <Input
            key={formElement.id}
            invalid={!formElement.config.valid}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          inputType="input"
          btnType="Success"
          disabled={!this.state.formIsValid}
        >
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
