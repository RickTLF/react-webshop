import React, { Component } from "react";
import { ApolloProvider, graphql, compose } from "react-apollo";
import gql from "graphql-tag";

const ALL_PRODUCTS_QUERY = gql`
query AllProductsQuery {
    allProducts{
        name
        category
        description
        price
        isOffer
    }
}
`

const SEARCH_PRODUCT_MUTATION = gql`
mutation ProductSearchMutation($input: String) {
    searchProduct(
        input: $input
    ) {
        name
        category
        description
        price
        isOffer
    }
}
`

export default function ProductService(client) {
  let _client = client;

  this.getAllProducts = function() {
    return new Promise((resolve) => {
      _client.query({
        query: ALL_PRODUCTS_QUERY
      })
      .then(result => { resolve(result.data.allProducts) })
      .catch(error => console.error(error));
    }).then((data) => { return data })
  };

  this.search = function(keyword) {
    return new Promise((resolve) => {
      _client.mutate({
        variables: {input: keyword},
        mutation: SEARCH_PRODUCT_MUTATION
      })
    .then(result => { resolve(result.data.searchProduct)})
      .catch(error => console.error(error));
    }).then((data) => { return data })
  };
}