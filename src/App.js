import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./container/BurgerBuilder/BurgerBuilder";
import Checkout from "./container/BurgerBuilder/Checkout/Checkout";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/" component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
