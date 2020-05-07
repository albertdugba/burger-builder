import React, { useState } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/order";
import Button from "../../../../components/UI/Button/Button";
import axiosInstance from "../../../../axios-orders";
import classes from "./ContactInfo.module.css";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Input from "../../../../components/UI/Input/Input";
import withErrorHandler from "../../hoc/withErrorHandler";

const ContactInfo = props => {
  const [orderForm, setOrderForm] = useState({
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
      value: "fastest",
      valid: true,
      validation: {},
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    setLoading(true);

    const formData = {};
    for (let formElId in orderForm) {
      formData[formElId] = orderForm[formElId].value;
    }
    const orders = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(orders, props.token);
  };

  const checkFormValidation = (value, rules) => {
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

  const inputChangedHandler = (event, inputId) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormEl = { ...updatedOrderForm[inputId] };
    updatedFormEl.value = event.target.value;
    updatedFormEl.touched = true;
    updatedFormEl.valid = checkFormValidation(
      updatedFormEl.value,
      updatedFormEl.validation,
    );
    updatedOrderForm[inputId] = updatedFormEl;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
    setOrderForm(updatedOrderForm);
  };
  const formElementArr = [];
  for (let key in orderForm) {
    formElementArr.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementArr.map(formElement => (
        <Input
          key={formElement.id}
          invalid={!formElement.config.valid}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button inputType="input" btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactInfo}>
      <h4>Please Enter Your Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactInfo, axiosInstance));
