import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/AccountPage";
import CartPage from "./Pages/CartPage";
import AdminPage from "./Pages/AdminPage";
import AccountService from "./Services/AccountService";
import { ApolloProvider, graphql, compose } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import gql from 'graphql-tag'

const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const USER_LOGIN = gql`
mutation LoginUserMutation($email: String, $password: String) {
  login(
    email: $email
    password: $password 
  ) {
    email
    password
  }
}
`
const Application = 
function Application(props) {
  let accountService = new AccountService(client);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar client={client}  service={accountService} />
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
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default Application;
