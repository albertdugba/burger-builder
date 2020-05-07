import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import classes from "./Auth.module.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: false,
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

  inputChangedHandler = (event, controlName) => {
    const updatedontrols = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkFormValidation(
          event.target.value,
          this.state.controls[controlName].validation,
        ),
        touched: true,
      },
    };

    this.setState({ controls: updatedontrols });
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup,
    );
  };

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    let formElementArr = [];

    for (let key in this.state.controls) {
      formElementArr.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElementArr.map(formElement => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitFormHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>

        <Button btnType="Danger" clicked={this.switchModeHandler}>
          Switch to {this.state.isSignup ? "SignUp" : "SignIn"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
