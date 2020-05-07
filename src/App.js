import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import * as actions from "./store/actions/index";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Logout from "./container/BurgerBuilder/Auth/Logout/Logout";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = lazy(() => {
  return import("./container/BurgerBuilder/Checkout/Checkout");
});

const Orders = lazy(() => {
  return import("./container/BurgerBuilder/Orders/Orders");
});

const Auth = lazy(() => {
  return import("./container/BurgerBuilder/Auth/Auth");
});

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={() => <Checkout />} />
        <Route path="/orders" render={() => <Orders />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token != null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
