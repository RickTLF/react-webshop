import React, { Component } from "react";
import { ProductCardMin } from "../Components/Items/ProductCard";
import { Modal, ModalLauncher } from "../Components/Misc/Modal";
import logo from "../logo.svg";
import {
  LoginForm,
  AccountInfoForm,
  ShippingAddressForm
} from "../Components/Forms/AccountForm";

export default function CartPage() {
  return (
    <div>
      <div className={"container"} style={{ marginTop: "50px" }}>
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col" colSpan={"2"}>
                Product
              </th>
              <th scope="col">Price</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={logo} alt={"product"} />
              </td>
              <td>Product</td>
              <td>&euro;0,00</td>
              <td>
                <input
                  className={"btn btn-light btn-sm"}
                  type={"number"}
                  defaultValue={1}
                  min={1}
                  max={100}
                  // onChange={(e) => this.handleChange(e)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <img src={logo} alt={"product"} />
              </td>
              <td>Product</td>
              <td>&euro;0,00</td>
              <td>
                <input
                  className={"btn btn-light btn-sm"}
                  type={"number"}
                  // defaultValue={this.state.quantity}
                  min={1}
                  max={10}
                  // onChange={(e) => this.handleChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <label className={'btn btn-dark btn-block'}>Total: &euro;0,00</label><br />
        <button className={'btn btn-danger btn-block'}>Proceed to checkout</button>


      </div>
    </div>
  );
}

function AddressCard(props) {
  return (
    <div className={"card-body"}>
      <h5>Shipping address</h5>
      <hr />
      <small>
        {props.address}
        <br />
        {props.city}
        <br />
        {props.state}
        <br />
        {props.country}
        <br />
        {props.zipCode}
      </small>
    </div>
  );
}

function AccountItem(props) {
  return (
    <div className={"card bg-light"} style={{ border: 0 }}>
      {props.children}
    </div>
  );
}
