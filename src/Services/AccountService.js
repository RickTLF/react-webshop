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
  let errorMessage = "";
  let user = null;
  let _client = client;

  this.getUser = function() {
    return user;
  };

  this.getErrorMessage = function() {
    return errorMessage;
  };

  this.login = function(email, password) {
    if (email == "" || password == "") {
      errorMessage = "Email or password is empty.";
      return false;
    }

    // console.log(_client)

    /*_client
      .query({
        query: ALL_USERS_QUERY
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));*/

    _client
      .mutate({
        variables: { email: email, password: password },
        mutation: USER_LOGIN
      })
      .then(data => user = data)
      .catch(error => console.error(error));

    // graphql ()

    /*user = {
        email: email,
        password: password,
        admin: false
    }*/
    resetErrorMessage();
    return true;
  };

  function resetErrorMessage() {
    errorMessage = "";
  }
}
