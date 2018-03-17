import React, { Component } from "react";

export function ModalLauncher(props) {
  return (
    <button
      type="button"
      className={props.className == null ? "btn btn-info" : props.className}
      data-toggle="modal"
      data-target={`#${props.target}`}
    >
      {props.children}
    </button>
  );
}

export function ModalLauncherLink(props) {
  return (
    <a
      style={{outline: 'none'}}
      href={"#"}
      className={props.className == null ? "btn btn-info" : props.className}
      data-toggle={"modal"}
      data-target={`#${props.target}`}
    >
      {props.children}
    </a>
  );
}

export function Modal(props) {
  return (
    <div
      className={"modal fade text-light"}
      id={props.id}
      tabindex={"-1"}
      role={"dialog"}
      aria-labelledby={"exampleModalLabel"}
      aria-hidden={"true"}
    >
      <div className={`modal-dialog ${(props.center)? 'modal-dialog-centered' : ''} ${(props.large)? 'modal-lg' : ''}`} role={"document"}>
        <div className={"modal-content"}>
          <ModalHeader title={props.title} />
          <div className={"modal-body bg-dark"}>{props.children}</div>
          <ModalFooter actions={props.actions} />
        </div>
      </div>
    </div>
  );
}

function ModalHeader(props) {
  return (
    <div className={"modal-header bg-dark text-light"} >
      <h5 className={"modal-title"}>{props.title}</h5>
      <CloseButton />
    </div>
  );
}

function ModalFooter(props) {
  let notNull = !(props.actions == null);
  let isArray = props.actions instanceof Array;
  let notEmptyArray = isArray && props.actions.length > 0;

  let actions = (
    <div>
      {notNull &&
        (notEmptyArray ? props.actions.map(action => action) : props.actions)}
      <button
        id={"dismissModal"}
        type={"button"}
        className={"btn btn-secondary"}
        data-dismiss={"modal"}
      >
        Close
      </button>
    </div>
  );

  return (
    <div className={"modal-footer bg-dark text-light"}>
      {actions}
    </div>
  );
}

function CloseButton() {
  return (
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
