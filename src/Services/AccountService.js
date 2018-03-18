import React, { Component } from "react";
import { ApolloProvider, graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const USER_LOGIN = gql`
  mutation LoginUserMutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      password
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query AllUsersQuery {
    allUsers {
      _id
      email
      password
    }
  }
`;

export default function AccountService(client) {
  let _client = client;
  let user = new Promise((resolve) => {
    resolve(null)
  }).then((data) => {return data})
  let errorMessage = "";
  let state = 'INIT'

  this.getState = function() {
    return state
  }

  this.getUser = function() {
    return user;
  };

  this.getErrorMessage = function() {
    return errorMessage;
  };

  this.login = function(email, password) {
    let state = 'INIT'
    if (email == "" || password == "") {
      errorMessage = "Email or password is empty.";
      return false;
    }

    user = new Promise((resolve) => {
      _client.mutate({
        variables: { email: email, password: password },
        mutation: USER_LOGIN
      })
      .then(result => { resolve(result.data.login) })
      .catch(error => console.error(error));
    }).then((data) => { return data})
    state = 'LOADED'
    resetErrorMessage();
    return true;
  };

  this.setUser = function(authUser) {
    user = new Promise((resolve) => {
      resolve(authUser)
    }).then((data) => {return data})
    state = 'LOADED'
  }

  // TODO: Remove cookie here
  this.logout = function() {
    let state = 'INIT'
    this.setUser(null)
    state = 'LOADED'
    return this
  }

  // TODO: Save cookie here
  this.saveCookie = function(user) {
    // Set token
    let state = 'INIT'
    let _id = user._id;
    let email = user.email;
    let password = user.password;

    let extractedUserInfo = { _id: _id, email: email, password: password };
    let checkPreviousToken = localStorage.getItem("token");

    // Check to see if previous items must be replaced
    if (!(checkPreviousToken == null)) {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", JSON.stringify(extractedUserInfo));
    state = 'LOADED'
  }

  this.removeUserToken = function() {
    state = 'INIT';
    localStorage.removeItem("token");
    this.setUser(null)
    state = 'LOADED';
  }

  this.getUserToken = function() {
    state = 'INIT';
    let authUser = localStorage.getItem("token");
    state = 'LOADED';
    return authUser;
  }

  function resetErrorMessage() {
    errorMessage = "";
  }
}