import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/AccountPage";
import CartPage from "./Pages/CartPage";
import AdminPage from "./Pages/AdminPage";
import AccountService from "./Services/AccountService";

function Application() {
  let accountService = new AccountService();

  return (
    <div>
      <NavBar service={accountService} />
      <Router>
        <Switch>
          <Route
            exact
            path={"/"}
            render={props => <HomePage service={accountService} />}
          />
          <Route exact path={"/account"} render={props => <AccountPage />} />
          <Route exact path={"/cart"} render={props => <CartPage />} />
          <Route exact path={"/admin"} render={props => <AdminPage />} />
          <Route
            render={props => (
              <div className={"container"}>
                <br />
                <div className={"alert alert-danger mx-auto"}>
                  Page not found!
                </div>
              </div>
            )}
          />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default Application;
