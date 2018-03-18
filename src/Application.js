import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import AccountPage from "./Pages/AccountPage";
import CartPage from "./Pages/CartPage";
import AdminPage from "./Pages/AdminPage";
import AccountService from "./Services/AccountService";
import ProductService from "./Services/ProductService";
import { ApolloProvider, graphql, compose } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

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

export default class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountService: new AccountService(client),
      productService: new ProductService(client),
      user: null
    };
  }

  componentDidMount() {
    let service = this.state.accountService 
    let authUser = service.getUserToken()
    console.log(service.getState())
    if (authUser == null) {
      console.log("User is not authenticated.");
    } else {
      if (this.state.user == null) {
        this.setState({ user: JSON.parse(authUser) });
      }
      // console.log(this.state.user)
      // console.log("User IS authenticated.");
    }

    if (!(authUser == null)) {
      this.state.accountService.setUser(authUser)
    }

    console.log(this.state.accountService.getState())
    this.setState({accountService: service})
  }

  handleLogin = user => {
    this.setState({ user: user });
    this.state.accountService.saveCookie(user)
  };

  handleLogout = () => {
    let service = this.state.accountService
    this.setState({user: null});
    service.removeUserToken()
    this.setState({accountService: service})
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <NavBar
              client={client} // May need to remove
              service={this.state.accountService}
              notify={this.handleLogin}
              onClickLogout={this.handleLogout}
              user={this.state.user}
            />
            <Switch>
              <Route
                exact
                path={"/"}
                render={props => (
                  <HomePage service={this.state.productService} />
                )}
              />
              <Route
                exact
                path={"/account"}
                render={props => <AccountPage {...props} service={this.state.accountService} />}
              />
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
}
