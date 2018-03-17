import React, { Component } from "react";

export default function AccountService() {
  let errorMessage = "";
  let user = null

  this.getUser = function() {
      return user;
  }

  this.getErrorMessage = function() {
    return errorMessage;
  };

  this.login = function(email, password) {
    if (email == "" || password == "") {
      errorMessage = "Email or password is empty.";
      return false;
    }
    user = {
        email: email,
        password: password,
        admin: false
    }
    resetErrorMessage();
    return true;
  };

  function resetErrorMessage() {
    errorMessage = "";
  }
}
