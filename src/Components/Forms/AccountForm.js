import React, { Component } from "react";

// TODO: May be used to validate
function EmailInput(props) {
  return (
    <div className={"form-group"}>
      <input
        value={props.value}
        onChange={props.onChange}
        type={"email"}
        className={"form-control"}
        placeholder={"Enter email"}
      />
    </div>
  );
}

// TODO: May be used to validate
function PasswordInput(props) {
  return (
    <div className={"form-group"}>
      <input
        value={props.value}
        onChange={props.onChange}
        type={"password"}
        className={"form-control"}
        placeholder={"Enter password"}
      />
    </div>
  );
}

// TODO: May be used to validate
function TextInput(props) {
  return (
    <div className={"form-group"}>
      <input
        type={"text"}
        className={"form-control"}
        placeholder={props.placeholder}
      />
    </div>
  );
}

// TODO: May be used to validate
function TextArea(props) {
  return (
    <div class="form-group">
      <textarea
        className="form-control"
        rows="3"
        placeholder={props.placeholder}
      />
    </div>
  );
}

function NumberInput(props) {
  return (
    <div className={"form-group"}>
      <input
        type={"number"}
        className={"form-control"}
        defaultValue={props.defaultValue}
        pattern={props.pattern}
        manLength={2}
      />
    </div>
  );
}

function FormCheck(props) {
  return (
    <div className={"form-check"}>
      <input type={"checkbox"} className={"form-check-input"} />
      <label className="form-check-label">{props.children}</label>
    </div>
  );
}

function Message(props) {
  return (
    <div className={"alert alert-info bg-info text-light"} role={"alert"}>
      {props.children}
    </div>
  );
}

export function LoginForm(props) {
  return (
    <BaseForm errorMessage={props.errorMessage} onSubmit={props.onSubmit}>
      <EmailInput value={props.email} onChange={props.onChangeEmail} />
      <PasswordInput value={props.password} onChange={props.onChangePassword} />
      {/* Place the hidden button in the base form */}
      <button hidden type={'submit'}>Submit</button>
    </BaseForm>
  );
}

export function UserInfoForm(props) {
  return (
    <BaseForm errorMessage={props.errorMessage}>
      <TextInput placeholder={"Enter first-name"} />
      <TextInput placeholder={"Enter last-name"} />
      <TextInput placeholder={"Enter phone number"} />
    </BaseForm>
  );
}

function Select(props) {
  let notNull = !(props.items == null);
  let isArray = props.items instanceof Array;
  let notEmptyArray = isArray && props.items.length > 0;

  return (
    <div className="form-group">
      <select className="form-control">
        {notNull &&
          (notEmptyArray
            ? props.items.map(item => <option>{item}</option>)
            : props.actions)}
        <option />
      </select>
    </div>
  );
}

function ProductValueInput(props) {
  return (
    <div class="row">
      <div className={"col"}>
        <h2 className={"text-right"}>&euro;</h2>
      </div>
      <div className={"col"}>
        <NumberInput defaultValue={0} pattern="[0-9]{1}" />
      </div>
      <div className={"col"}>
        <NumberInput defaultValue={0} />
      </div>
      <div className={"col"}>
        <FormCheck className={"text-left"}>Sale</FormCheck>
      </div>
    </div>
  );
}

function FileInput(props) {
  return (
    <div className={"form-group"}>
      <div className="custom-file">
        <input type="file" className="custom-file-input" id="customFile" />
        <label className="custom-file-label" for="customFile">
          Choose file
        </label>
      </div>
    </div>
  );
}

export function ProductForm(props) {
  let items = [1, 2, 3, 4, 5, 1];

  return (
    <BaseForm errorMessage={props.errorMessage}>
      <TextInput placeholder={"Enter product"} />
      <Select items={items} />
      <TextArea placeholder={"Enter description"} />
      <FileInput />
      <ProductValueInput />
    </BaseForm>
  );
}

export function CategoryForm(props) {
  let currCategory = "uncategorized";

  return (
    <BaseForm errorMessage={props.errorMessage}>
      <div className={"card text-dark"}>
        <div className={"card-body"}>Hello world!</div>
      </div>
      <hr />
      <div className={"form-group"}>
        Category selected:{" "}
        <mark
          style={{ backgroundColor: "rgba(17, 120, 136, 0.8)", color: "white" }}
        >
          {currCategory}
        </mark>
      </div>
      <div className={"input-group mb-3"}>
        <input
          type={"text"}
          className={"form-control"}
          placeholder={"category"}
        />
        <div className={"input-group-append"}>
          <button className={"btn btn-info"} type={"button"}>
            Add new category
          </button>
        </div>
      </div>
    </BaseForm>
  );
}

// TODO: Change some into drop-down menu
export function ShippingAddressForm(props) {
  return (
    <BaseForm errorMessage={props.errorMessage}>
      <TextInput placeholder={"Enter address"} />
      <TextInput placeholder={"Enter city"} />
      <TextInput placeholder={"Enter state/province"} />
      <TextInput placeholder={"Enter country"} />
      <TextInput placeholder={"Enter postal/zip code"} />
    </BaseForm>
  );
}

function BaseForm(props) {
  let errMessageIsEmpty = props.errorMessage == "";

  return (
    <form className={"text-left"} onSubmit={props.onSubmit}>
      {props.children}
      {!(props.errorMessage == undefined || errMessageIsEmpty) && (
        <Message>{props.errorMessage}</Message>
      )}
    </form>
  );
}
