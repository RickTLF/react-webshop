import React, { Component } from "react";

export default function SearchForm() {
  return (
    <div className={"input-group mb-3"}>
      <input
        type={"text"}
        className={"form-control"}
        placeholder={"Search"}
      />
      <div className={"input-group-append"}>
        <button className={"btn btn-warning"} type={"button"}>
          Search
        </button>
      </div>
    </div>
  );
}
