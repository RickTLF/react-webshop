import React, { Component } from "react";
import { ProductCardMin } from "../Components/Items/ProductCard";
import { Modal, ModalLauncher } from "../Components/Misc/Modal";
import logo from "../logo.svg";
import {
  LoginForm,
  UserInfoForm,
  ShippingAddressForm
} from "../Components/Forms/AccountForm";

export default function AccountPage() {
  return (
    <div>
      <div className={"container"} style={{ marginTop: "50px" }}>
        <div class="row">
          <div className={"col-md-12"}>
            <div className="card-group">
              {/* Email and password */}
              <AccountItem>
                <div className={"card-header bg-dark text-light"}>
                  <h5>Account</h5>
                </div>
                <div className={"card-body"}>
                  <small>
                    Email: rick@gmail.com<br />
                    Password: ***********
                  </small>
                </div>

                <div className={"card-footer bg-dark"}>
                  <ModalLauncher
                    target={"modal"}
                    className={"btn btn-light btn-block"}
                    style={{ border: 0 }}
                  >
                    Update account
                  </ModalLauncher>
                  <Modal title={"Account"} id={"modal"} center>
                    <LoginForm />
                  </Modal>
                </div>
              </AccountItem>

              {/* Email and password */}
              <AccountItem>
                <div className={"card-header bg-dark text-light"}>
                  <h5>Info</h5>
                </div>
                <div className={"card-body"}>
                  <small>
                    First-name: Rick<br />
                    Last-name: Kock<br />
                    Phone: 566575399<br />
                  </small>
                </div>

                <div className={"card-footer bg-dark"}>
                  <ModalLauncher
                    target={"info-modal"}
                    className={"btn btn-light btn-block"}
                  >
                    Info
                  </ModalLauncher>
                  <Modal title={"Info"} id={"info-modal"} center>
                    <UserInfoForm />
                  </Modal>
                </div>
              </AccountItem>

              <AccountItem>
                <div className={"card-header bg-dark text-light"}>
                  <h5>Shipping address</h5>
                </div>
                <AddressCard
                  address={"Abel Tasmanstraat 54"}
                  city={"Den Bosch"}
                  state={"Noord brabant"}
                  country={"Nederland"}
                  zipCode={"5223 VZ"}
                />
                <div className={"card-footer bg-dark"}>
                  <ModalLauncher
                    target={"shipping-address"}
                    className={"btn btn-light btn-block"}
                  >
                    Update Address
                  </ModalLauncher>
                  <Modal
                    title={"Shipping address"}
                    id={"shipping-address"}
                    center
                  >
                    <ShippingAddressForm />
                  </Modal>
                </div>
              </AccountItem>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressCard(props) {
  return (
    <div className={"card-body"}>
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
