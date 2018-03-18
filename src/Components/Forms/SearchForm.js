import React, { Component } from "react";

export default function SearchForm(props) {
  return (
    <div className={"input-group mb-3"}>
      <input
        type={"text"}
        className={"form-control"}
        placeholder={"Search"}
        value={props.value}
        onChange={props.onChange}
      />
      <div className={"input-group-append"}>
        <button
          className={"btn btn-warning"}
          type={"button"}
          onClick={props.onSearchClick}
        >
          Search
        </button>
      </div>
    </div>
  );
}
