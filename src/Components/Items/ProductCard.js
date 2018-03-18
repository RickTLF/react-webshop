import React, { Component } from "react";
import logo from "../../logo.svg";

export function ProductCardMin(props) {
  let notNull = !(props.actions == null);
  let isArray = props.actions instanceof Array;
  let notEmptyArray = isArray && props.actions.length > 0;

  return (
    <div className={"card"}>
      <img className={"card-img-top"} src={logo} alt={"Card image cap"} />
      <div className={"card-body bg-dark text-light"}>
        <h5 className={"card-title"}>{props.name}</h5>
        <h4 className={'my-font'}>
          <span className={"text-info"}>&euro;{props.price}</span>
        </h4>
      </div>
      <div className={"card-footer bg-dark"}>
        {notNull && (
          <div>
            {notEmptyArray
              ? props.actions.map(action => action)
              : props.actions}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCardMax(props) {}
