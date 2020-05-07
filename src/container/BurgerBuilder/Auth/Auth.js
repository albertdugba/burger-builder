import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import classes from "./Auth.module.css";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Auth = props => {
  const [isSignup, setIsSignup] = useState(true);
  const [authForm, setAuthForm] = useState({
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
  });

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

  const { onSethAuthRedirectPath, authRedirectPath, building } = props;

  useEffect(() => {
    if (!building && authRedirectPath !== "/") {
      onSethAuthRedirectPath();
    }
  }, [onSethAuthRedirectPath, authRedirectPath, building]);

  const inputChangedHandler = (event, controlName) => {
    const updatedontrols = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkFormValidation(
          event.target.value,
          authForm[controlName].validation,
        ),
        touched: true,
      },
    };

    setAuthForm(updatedontrols);
  };

  const submitFormHandler = event => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignup);
  };

  const switchModeHandler = () => {
    setIsSignup(!isSignup);
  };

  let formElementArr = [];

  for (let key in authForm) {
    formElementArr.push({ id: key, config: authForm[key] });
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
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirect} />;
  }
  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitFormHandler}>
        {form}
        <Button btnType="Success">Submit</Button>
      </form>

      <Button btnType="Danger" clicked={switchModeHandler}>
        Switch to {isSignup ? "SignUp" : "SignIn"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token != null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.authReducer.authRedirect,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSethAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
